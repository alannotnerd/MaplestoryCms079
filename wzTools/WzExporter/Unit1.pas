unit Unit1;

interface

uses
  Windows, Messages, SysUtils, Variants, Classes, Graphics, Controls, Forms,
  Dialogs, StdCtrls, ExtCtrls, XMLIntf, ComCtrls, wzhelper;



type
  TForm1 = class(TForm)
    Button1: TButton;
    Memo1: TMemo;
    Panel1: TPanel;
    Button2: TButton;
    ProgressBar1: TProgressBar;
    Button3: TButton;
    Button4: TButton;
    Button5: TButton;
    procedure Button1Click(Sender: TObject);
    procedure FormCreate(Sender: TObject);
    procedure Button2Click(Sender: TObject);
    procedure Button3Click(Sender: TObject);
    procedure Button4Click(Sender: TObject);
    procedure Button5Click(Sender: TObject);
  private
    PMList:TMapleContentItem;
    { Private declarations }
  public
    { Public declarations }
  end;


var
  Form1: TForm1;
 buf: array[0..23] of byte = (
	$51, $7B, $6A, $13, $33, $AE, $DA, $A0, $DA, $63, $08, $A0, $F0, $0F, $72, $E8, 
	$07, $DE, $F5, $0E, $06, $5F,0,0
);

implementation

uses
  XMLDoc, wzStringCrypto, wzReader;

{$R *.dfm}


procedure TForm1.FormCreate(Sender: TObject);
begin
  PMList := TMapleContentItem.Create;
      
end;

procedure TForm1.Button1Click(Sender: TObject);
var
  keyIdx,I:Integer;
  sssss:widestring;

  aaaa:string;
begin
  keyIdx := 0;
  for I := 0 to Length(buf) div 2 - 2 do
  begin
    //unicode是两个两个的解码
    buf[i*2+1] := buf[i*2+1] xor UnicodeStrKey[keyIdx * 2 + 1] ;
    buf[i*2] := buf[i*2] xor UnicodeStrKey[keyIdx * 2] ;
    keyIdx := (keyIdx + 1) mod Length(UnicodeStrKey);
  end;


  sssss := PWideChar(@buf[0]);
  WideCharToStrVar(PWideChar(sssss), aaaa);

//  ShowMessage( WideStringToUCS4String(sssss) );
 ShowMessage(aaaa);
end;


procedure TForm1.Button4Click(Sender: TObject);
var
 I:Integer;
begin
  for I := 0 to Length(buf) - 2 do
  begin
    buf[i] := buf[i] xor ASciiStrKey[i mod $13] ;
  end;
  ShowMessage(Pchar(@buf[0]))
end;

procedure ExportOnce(Path:string; ff:TwzReader; MCI:TMapleContentItem);
var
  mn:TMapleNode;
  I: Integer;
begin
  if MCI.ContentType = 3 then   //目录
  begin
    for I := 0 to MCI.Count - 1 do
    begin
      ExportOnce(path + '\' + mci.ItemName, ff, MCI.Items[i]);
    end;
  end else if mci.ContentType = 4 then   //单纯的文件
  begin
    mn := TMapleNode.Create('imgdir');
    mn.Attributes['name'] := MCI.ItemName;
    ff.Position := MCI.BeginOffset;
    XmlStr(ff, MCI, mn);
    mn.SaveToXml(Path+'\');
    mn.Free;
  end;
end;

procedure TForm1.Button5Click(Sender: TObject);
var
  ff:TwzReader;
  headercount:integer;
  I: Integer;


begin 
  //ff := TwzReader.create('d:\Quest.wz', 0);
  //ff := TwzReader.create('d:\string.wz', 0);
  //ff := TwzReader.create('d:\base.wz', 0);
  ff := TwzReader.create('d:\item.wz', 0);
  //ff := TwzReader.create('d:\TamingMob.wz', 0);
  try
    ff.skip($c);
    headercount := ff.read4;
    ff.Seek(headercount, soBeginning);
    memo1.Lines.Add(format('UnknownWord:%.4x',[ff.Read2]));
    GetOrderList(ff, PMList);
    PMList.BeginOffset := ff.Position;
    SetOrderListOffset(PMList);
    //开始文件内容
    memo1.Lines.Add(format('------------CurPos:%.8x',[ff.Position]));

    ProgressBar1.Min := 0;
    ProgressBar1.Max := PMList.Count;
    for I := 5 to PMList.Count - 1 do
    begin
      ProgressBar1.Position := i;
      memo1.Lines.Add(Format('%d: %s',[i, PMList.Items[I].ItemName]));
      ExportOnce('d:\Export\',ff,PMList.Items[I]);
    end;
    ProgressBar1.Position := ProgressBar1.Max;
    memo1.Lines.Add('------------Ok------------');
  finally
    ff.Free;
  end;
end;

procedure TForm1.Button2Click(Sender: TObject);
var
  ff:TwzReader;
  headercount:integer;
  I: Integer;
begin
  //ff := TwzReader.create('d:\Quest.wz', 0);
  //ff := TwzReader.create('d:\string.wz', 0);
  //ff := TwzReader.create('d:\base.wz', 0);
  ff := TwzReader.create('d:\item.wz', 0);
  //ff := TwzReader.create('d:\TamingMob.wz', 0);
  ff.Position := $103ce30;

  ShowMessage(ff.ReadStr);
  ShowMessage(FloatToStr(ff.readdouble));
  ff.Free;
end;

procedure TForm1.Button3Click(Sender: TObject);
var
  ff:TwzReader;
  headercount:integer;
  Xml: IXMLDocument;
  XmlNode:IXMLNode;
  I: Integer;
begin
 // ff := TMakFileStream.create('d:\Quest.wz', 0);
  ff := TwzReader.create('d:\string.wz', 0);
 // ff := TMakFileStream.create('d:\base.wz', 0);
// ff := TMakFileStream.create('d:\item.wz', 0);
  //ff := TMakFileStream.create('d:\TamingMob.wz', 0);
  try
    ff.skip($c);
    headercount := ff.read4;
    ff.Seek(headercount, soBeginning);
    memo1.Lines.Add(format('UnknownWord:%.4x',[ff.Read2]));
    GetOrderList(ff, PMList);
    SetOrderListOffset(PMList);
    //开始文件内容
    memo1.Lines.Add(format('------------CurPos:%.8x',[ff.Position]));

    ProgressBar1.Min := 0;
    ProgressBar1.Max := PMList.Count;
    for I := 12 to PMList.Count - 1 do
    begin
      Xml := TXMLDocument.Create(nil);
      Xml.Active := True;
      Xml.Version := '1.0';
      Xml.Encoding :='UTF-8';
      Xml.StandAlone := 'yes';
      XmlNode := xml.CreateNode('imgdir');
      XmlNode.Attributes['name'] := PMList.Items[I].ItemName;
      Xml.DocumentElement := XmlNode;
      ff.Position := PMList.Items[I].BeginOffset;
//      XmlStr(ff, PMList.Items[I], XmlNode);
      Xml.SaveToFile('d:\Export\'+PMList.Items[I].ItemName+'.xml');

      ProgressBar1.Position := i;
    end;

    memo1.Lines.Add('------------Ok------------');
  finally
    ff.Free;
  end;

  
end;


end.

