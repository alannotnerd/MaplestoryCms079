unit wzReader;

interface

uses
  Classes, Windows, SysUtils;

type
  TwzReader = class(TFileStream)
  public
    function Skip(count: integer): Dword;
    function ReadStr: WideString;overload;
    function ReadStr(Offset:Dword): WideString;overload;
    function Read1: byte;
    function Read2: Word;
    function Read4: Dword;
    function Read1To4: Dword;
    function ReadFloat: Single;
    function NextByte:Byte;
    function NextWord: Word;
    function ReadcryptBytes(len: Integer): Tbytes;
    function ReadDouble: Double;
  end;

implementation

uses
  wzStringCrypto, Dialogs;

function TwzReader.NextByte: Byte;
begin
  Read(Result, 1);
  Skip(-1);
end;

function TwzReader.NextWord: Word;
begin
  Read(Result, 2);
  Skip(-2);
end;

function TwzReader.Read1:byte;
begin
  Read(Result, 1);
end;

function TwzReader.Read2:Word;
begin
  Read(Result, 2);
end;

function TwzReader.Read4:Dword;
begin
  Read(Result, 4);
end;

function TwzReader.Read1To4:Dword;
begin
  Result := 0;
  Read(Result, 1);
  if Result=$80 then
    Read(Result, 4);
end;

function TwzReader.ReadFloat:Single;
var
  TmpByte:Byte;
  TmpDword:DWORD;
begin
  Read(TmpByte, 1);
  if TmpByte=$80 then
  begin
    Read(TmpDword, 4);
    PDWORD(@Result)^ := TmpDword;
  end else if TmpByte=$0 then
  begin
    Result := 0;
  end else begin
    ShowMessage('浮点类型异常');
  end;
end;

function TwzReader.ReadDouble:Double;
begin
  Read(PInt64(@Result)^, 8);
end;

function TwzReader.ReadStr(Offset:Dword):WideString;
var
  oldPosition:Integer;
begin
  oldPosition := position;
  position := Offset;
  Result := ReadStr;
  position := oldPosition;
end;

function TwzReader.ReadStr:WideString;
var
  StrLen:integer;
  buf:Array of byte;
  keyIdx:Integer;
  I: Integer;
begin
  StrLen := Read1;
  if StrLen = 0 then
  begin
    Result := '';
  end else
  if StrLen >= $80 then
  begin
    if StrLen=$80 then
    begin
      StrLen := Read4;
    end else begin
      StrLen := (StrLen xor $FF) + 1; //求补
    end;
    SetLength(buf, StrLen + 1);
    Read(buf[0], StrLen);
    keyIdx := 0;
    for I := 0 to StrLen - 1 do
    begin
      buf[i] := buf[i] xor ASciiStrKey[keyIdx];
      keyIdx := (keyIdx + 1) mod Length(ASciiStrKey);
    end;
    Result := Pchar(buf);
  end else begin
    if StrLen = $7F then
      StrLen := Read4 ;

    StrLen := StrLen + StrLen;
    SetLength(buf, StrLen + 2);
    Read(buf[0], StrLen);
    keyIdx := 0;
    for I := 0 to StrLen div 2 - 1 do
    begin
      //unicode是两个两个的解码
      buf[i*2+1] := buf[i*2+1] xor UnicodeStrKey[keyIdx * 2 + 1];
      buf[i*2] := buf[i*2] xor UnicodeStrKey[keyIdx * 2];
      keyIdx := (keyIdx + 1) mod Length(UnicodeStrKey);
    end;
    //Result := WideCharToString(PWideChar(buf));
    Result := (PWideChar(buf));
  end;
end;

function TwzReader.ReadcryptBytes(len:Integer):Tbytes;
var
  I: Integer;
begin
  SetLength(Result, len);
  ReadBuffer(Result[0], len);
  for I := 0 to len - 1 do
  begin
    Result[i] := Result[i] xor UnhashKey[i];
  end;
end;

function TwzReader.Skip(count:integer):Dword;
begin
  Result := Seek(count, soCurrent);
end;

end.
