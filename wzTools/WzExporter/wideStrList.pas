unit wideStrList;

interface

uses
  Classes;

type
  PWideStrItem = ^TWideStrItem;
  TWideStrItem = record
    name:string;
    data:WideString;
  end;
  PWideStrItemList = ^TWideStrItemList;
  TWideStrItemList = array[0..MaxListSize] of TWideStrItem;

Type
  TWideStrList = class
  private
    FList:PWideStrItemList;
    FCount: Integer;
    FCapacity:Integer;
    procedure SetCapacity(NewCapacity: Integer);
    procedure Grow;
    procedure InsertItem(Index: Integer; const S: string; value: WideString);
    function Add(const S: string; value:WideString): Integer;
    procedure SetValue(const S: string; const Value: WideString);
    function GetValue(const S: string): WideString;
    function GetItemName(Idx:Integer):string;
    function GetItemValue(Idx:Integer):WideString;
  public
    procedure Clear;
    function IndexOf(const S: string): Integer;
    property Value[const S: string]: WideString read GetValue write SetValue;default;
    property Names[Idx:Integer]: string read GetItemName;
    property ValueOfIndesx[Idx:Integer]: WideString read GetItemValue;
    property Count:Integer read FCount;
    destructor Destroy; override;
  end;


implementation

uses
  SysUtils;

{ TWideStrList }

destructor TWideStrList.Destroy;
begin
  inherited Destroy;
  if FCount <> 0 then Finalize(FList^[0], FCount);
  FCount := 0;
  SetCapacity(0);
end;

function TWideStrList.Add(const S: string; value:WideString): Integer;
begin
  Result := FCount;
  InsertItem(Result, S, value);
end;

function TWideStrList.IndexOf(const S: string): Integer;
begin
  for Result := 0 to FCount - 1 do
    if AnsiCompareText(FList^[Result].name, S) = 0 then Exit;
  Result := -1;
end;

procedure TWideStrList.InsertItem(Index: Integer; const S: string; value: WideString);
begin
  if FCount = FCapacity then Grow;
  if Index < FCount then
    System.Move(FList^[Index], FList^[Index + 1],
      (FCount - Index) * SizeOf(TWideStrItem));
  with FList^[Index] do
  begin
    Pointer(name) := nil;
    name := S;
    Pointer(data) := nil;
    data := value;
  end;
  Inc(FCount);
end;

procedure TWideStrList.SetValue(const S: string; const Value: WideString);
var
  idx:Integer;
begin
  idx := IndexOf(s);
  if idx>=0 then
  begin
    Pointer(Flist^[idx].data) := nil;
    Flist^[idx].data := Value;
  end else
    Add(s , Value);

end;

function TWideStrList.GetItemName(Idx: Integer): string;
begin
  if Idx<FCount then
    Result := Flist^[idx].name
  else
    Result := '';
end;

function TWideStrList.GetItemValue(Idx: Integer): WideString;
begin
  if Idx<FCount then
    Result := Flist^[idx].data
  else
    Result := '';
end;

function TWideStrList.GetValue(const S: string): WideString;
var
  idx:Integer;
begin
  idx := IndexOf(s);
  if idx>=0 then
    Result := Flist^[idx].data
  else
    Result := ''
end;

procedure TWideStrList.SetCapacity(NewCapacity: Integer);
begin
  ReallocMem(FList, NewCapacity * SizeOf(TWideStrItem));
  FCapacity := NewCapacity;
end;

procedure TWideStrList.Grow;
var
  Delta: Integer;
begin
  if FCapacity > 64 then Delta := FCapacity div 4 else
    if FCapacity > 8 then Delta := 16 else
      Delta := 4;
  SetCapacity(FCapacity + Delta);
end;

procedure TWideStrList.Clear;
begin
  if FCount <> 0 then
  begin
    Finalize(FList^[0], FCount);
    FCount := 0;
    SetCapacity(0);
  end;
end;

end.

