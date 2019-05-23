unit wzhelper;

interface

uses
  Classes, Types, ElAES, wzReader, XMLIntf, Contnrs, wideStrList;


type
  TMapleNode = class
  private
    function XmlLoopChild(RootMn: TMapleNode; XmlNode: IXMLNode): Boolean;
  public
    tagName:string;
    parant: TMapleNode;
    childrens:TList;
    Attributes : TWideStrList;
    constructor Create(tagName:string);
    destructor Destroy; override;
    procedure add(Node:TMapleNode);
    function SaveToXml(Path: string): Boolean;
    function getPath:string;
  end;  
  
type
 TMapleContentItem = class
    function Get(Index: Integer): TMapleContentItem;
    procedure Put(Index: Integer; Item: TMapleContentItem);
 public
   ItemName:string;
   parant: TMapleContentItem;
   NodeSize:Dword;
   UN_1:Dword;
   UN_2:Dword;
   ContentType:byte; //3 目录，4 img
   SubContent:TList;
   BeginOffset:DWORD;//数据开始位置
   property Items[Index: Integer]: TMapleContentItem read Get write Put;
   procedure add(Mci:TMapleContentItem);
   constructor Create;
   function Count:Integer;
   function getPath:string;
 end;


function XmlStr(ff:TwzReader; Mci:TMapleContentItem; Node:TMapleNode):WideString;
procedure GetOrderList(ff:TwzReader;RootMci:TMapleContentItem);
procedure SetOrderListOffset(Mci:TMapleContentItem);

implementation

uses
  SysUtils, Windows, Dialogs, XMLDoc, wzImageReader, wzConst;


{ TMapleContentItem }

procedure TMapleContentItem.add(Mci: TMapleContentItem);
begin
  SubContent.Add(Mci);
  Mci.parant := Self;
end;

function TMapleContentItem.Count: Integer;
begin
  Result := SubContent.Count;
end;

constructor TMapleContentItem.Create;
begin
  SubContent := TList.Create;
end;

function TMapleContentItem.Get(Index: Integer): TMapleContentItem;
begin
  Result := TMapleContentItem(SubContent.Items[Index]);
end;

function TMapleContentItem.getPath: string;
var
  tmpMCI:TMapleContentItem;
begin
  Result := '';
  tmpMCI := Self.parant;
  while tmpMCI <> nil do
  begin
    Result := tmpMCI.ItemName + '\' + Result;
    tmpMCI := tmpMCI.parant;
  end;
end;

procedure TMapleContentItem.Put(Index: Integer; Item: TMapleContentItem);
begin
  SubContent.Items[Index] := Item;
end;

procedure SetOrderListOffset(Mci:TMapleContentItem);
var
  Idx:DWORD;
  I:Integer;
begin
  Idx := Mci.BeginOffset;
  for I := 0 to Mci.Count - 1 do
  begin
    Mci.Items[i].BeginOffset := Idx;
    Idx := Idx + Mci.Items[i].NodeSize;
  end;

  for I := 0 to Mci.Count - 1 do
  begin
    SetOrderListOffset(Mci.Items[i]);
  end;
end;

procedure GetOrderList(ff:TwzReader;RootMci:TMapleContentItem);
var
  I:integer;
  fileCount:Integer;
  dataType:Byte;
  pmc:TMapleContentItem;
begin                    
  fileCount := ff.Read1To4;
  for I := 0 to fileCount - 1 do
  begin
    dataType := ff.Read1;
    if (dataType=3) or (dataType=4) then
    begin
      pmc := TMapleContentItem.create;
      pmc.ContentType := dataType;
      pmc.ItemName := ff.ReadStr;
      pmc.NodeSize := ff.Read1To4;
      pmc.UN_1 := ff.Read1To4;
      pmc.UN_2 := ff.Read4;
      RootMci.Add(Pointer(pmc));
    end else begin
      showmessage('GetOrderList.dataType' + IntToStr(dataType));
    end;
  end;
  for I := 0 to RootMci.Count - 1 do
  begin
    if TMapleContentItem(RootMci.Items[I]).ContentType = 3 then
    begin
      GetOrderList(ff, TMapleContentItem(RootMci.Items[I]))
    end;
  end;
end;

procedure XmlStr_ReadValue(ff:TwzReader; Mci:TMapleContentItem; Node:TMapleNode);
var
  DataType:byte;
begin
  DataType := ff.Read1;
  case DataType of
    0://None
    begin
      Node.tagName := 'string';
      Node.Attributes['value'] := '';
    end;
    3://int
    begin
      Node.tagName := 'int';
      Node.Attributes['value'] := IntToStr(ff.Read1To4);
    end;
    4://float
    begin
      Node.tagName := 'float';
      Node.Attributes['value'] := FloatToStr(ff.ReadFloat);
    end;
    5://double
    begin
      Node.tagName := 'double';
      Node.Attributes['value'] := FloatToStr(ff.ReadDouble);
    end;
    8://string
    begin
      Node.tagName := 'string';
      Node.Attributes['value'] := XmlStr(ff, Mci, Node);
    end;
    9://  Tree Node
    begin
      ff.Read4;  //当前节点大小
      Node.tagName := 'imgdir';
      XmlStr(ff, Mci, Node);
    end;
    $B:// Short
    begin
      Node.tagName := 'short';
      Node.Attributes['value'] := IntToStr(ff.Read2);
    end;
  else
    ShowMessage(Format('XmlStr_ReadValue,数据类型:%.2x,%.8x,%s,%s',[DataType, ff.Position, mci.ItemName,Node.getPath]));
  end;
end;

function expand_package_Property(ff:TwzReader; Mci:TMapleContentItem; Node:TMapleNode):WideString;
var
  SubNodeCount,I:Integer;
  TmpNode:TMapleNode;
begin
  ff.Read2;
  SubNodeCount := ff.Read1To4;
  for I := 0 to SubNodeCount - 1 do
  begin
    TmpNode := TMapleNode.Create('imgdir');
    Node.add(TmpNode);
    Result := XmlStr(ff, mci, Node);
    TmpNode.Attributes['name'] := Result;
    XmlStr_ReadValue(ff, mci, TmpNode);
  end;
end;


function expand_package_Canvas(ff:TwzReader; Mci:TMapleContentItem; Node:TMapleNode):WideString;
var
  imgWidth,imgHeight:Integer;
  imgFormat:Integer;
  reserved:Integer;
  zlibDataSize:Integer;
  zlibData:TMemoryStream;
  
  readbegin:Integer;
  dataLen:Integer;
  data:TBytes;
begin
  imgWidth := ff.Read1To4;
  imgHeight := ff.Read1To4;
  imgFormat := ff.Read2;//?? Read1To4  //1 icon
  reserved := ff.Read4;
  zlibDataSize := ff.Read4;  //压缩后的大小
  ff.Read1;    //跳过数据的第一个字节，貌似全是0
  zlibData := TMemoryStream.Create;
  if ff.NextWord = $9C78 then   //zlib压缩前缀
  begin
    zlibData.CopyFrom(ff, zlibDataSize - 1);
  end else begin
    readbegin := ff.Position - 1;
    while readbegin + zlibDataSize > ff.Position do
    begin
      datalen := ff.Read4;
      data := ff.ReadcryptBytes(datalen);
      zlibData.Write(data[0], datalen);
    end;
  end;
  decodePngImgToFile(zlibData, imgWidth, imgHeight, OutPutPath+ MCI.getPath + Node.getPath + '.png');
end;

function expand_package(FileTypeStr:string; ff:TwzReader; Mci:TMapleContentItem; Node:TMapleNode):WideString;
begin
  //Shape2D#Vector2D, Shape2D#Convex2D  ,Canvas, UOL ,Sound_DX8
  if FileTypeStr='Property' then
  begin
    expand_package_Property(ff, Mci, Node);
  end else if FileTypeStr='Shape2D#Convex2D' then
  begin
    ShowMessage(FileTypeStr);
  end else if FileTypeStr='Shape2D#Vector2D' then
  begin
    Node.tagName := 'vector';
    Node.Attributes['x'] := IntToStr(ff.Read1To4);
    Node.Attributes['y'] := IntToStr(ff.Read1To4);
  end else if FileTypeStr='Canvas' then
  begin
    ff.Read1;//  00
    if ff.Read1 = 1 then
    begin
      expand_package_Property(ff, Mci, Node);
    end;
    expand_package_Canvas(ff, Mci, Node);

  end else if FileTypeStr='UOL' then
  begin
    ff.Read1;//  00
    Node.tagName := 'uol';
    Node.Attributes['value'] := XmlStr(ff, Mci, Node);
  end else if FileTypeStr='Sound_DX8' then
  begin
     ShowMessage(FileTypeStr);
  end else begin
    ShowMessage('未知文件类型：' + FileTypeStr);
  end;
end;
function XmlStr(ff:TwzReader; Mci:TMapleContentItem; Node:TMapleNode):WideString;
var
  DataType:byte;
  FileTypeStr:string;
begin
  Result := '';
  DataType := ff.Read1;
  case DataType of
      0:  //str
      begin
        Result := ff.ReadStr;
      end;
      1://str的指针
      begin
        Result := ff.ReadStr(ff.Read4 + Mci.BeginOffset);
      end;
      $1b: //treeLeaf
      begin
        FileTypeStr := ff.ReadStr(ff.Read4 + Mci.BeginOffset);
        Result := expand_package(FileTypeStr, ff, mci, Node);
      end;
      $73: //rootTree
      begin
//        if ff.Position<$4c17A then
//          ff.Position := $4c17A;

        FileTypeStr := ff.ReadStr;
        Result := expand_package(FileTypeStr, ff, mci, Node);
      end;
  else
    ShowMessage(Format('readData,数据类型:%.2x,%.8x,%s,%s',[DataType, ff.Position, mci.ItemName,Node.getPath]));
  end;
end;

{ TMapleNode }

procedure TMapleNode.add(Node: TMapleNode);
begin
  childrens.Add(Node);
  Node.parant := Self;
end;

constructor TMapleNode.Create(tagName:string);
begin
  childrens := TList.Create;
  Attributes := TWideStrList.Create;
  Self.tagName := tagName;
end;

destructor TMapleNode.Destroy;
var
  I: Integer;
begin
  for I := 0 to childrens.Count - 1 do
  begin
    TObject(childrens.items[i]).free;
  end;
 
  Attributes.Free;
  inherited;
end;

function TMapleNode.getPath: string;
var
  TmpNode:TMapleNode;
begin
  Result := '';
  TmpNode := Self;
  while TmpNode <> nil do
  begin
    Result := TmpNode.Attributes['name'] + '.' + Result;
    TmpNode := TmpNode.parant;
  end;
end;

function TMapleNode.XmlLoopChild(RootMn:TMapleNode; XmlNode:IXMLNode):Boolean;
var
  I,J: Integer;
  TmpXmlNode: IXMLNode;
  aChildMn:TMapleNode;
  value:WideString;
begin
  for I := 0 to RootMn.Attributes.Count - 1 do
  begin
    value := RootMn.Attributes.ValueOfIndesx[i];
    XmlNode.Attributes[RootMn.Attributes.Names[i]] := value;
  end;

  for I := 0 to RootMn.childrens.Count - 1 do
  begin
    aChildMn := RootMn.childrens.Items[i];
    TmpXmlNode := XmlNode.OwnerDocument.CreateNode(aChildMn.tagName);
    XmlNode.ChildNodes.Add(TmpXmlNode);
    XmlLoopChild(aChildMn, TmpXmlNode);
  end;
end;

function TMapleNode.SaveToXml(Path:string):Boolean;
var
  Xml: IXMLDocument;
  XmlRoot:IXMLNode;
begin
  Xml := TXMLDocument.Create(nil);
  Xml.Options := [doNodeAutoIndent];//换行
  Xml.NodeIndentStr := #9;//使用TAB字符缩进
  Xml.Active := True;
  Xml.Version := '1.0';
  Xml.Encoding :='UTF-8';
  Xml.StandAlone := 'yes';
  XmlRoot := xml.CreateNode(Self.tagName);
  Xml.DocumentElement := XmlRoot;
  XmlLoopChild(Self, XmlRoot);
  Xml.SaveToFile(Path+'\'+Self.Attributes['name']+'.xml');
end;

end.
