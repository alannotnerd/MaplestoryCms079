unit wzRecord;

interface

uses
  Windows, SysUtils, wzReader, wzMapleContentItem;


type
  Pwzheader =^Twzheader;
  Twzheader = packed record
     singnature:Dword;  //PKG1
     datasize:Int64;
     headersize:DWORD;
     copyright:array[0..43] of Char;
     versionhash:Word;
  end;
  TwzheaderClass = Class
    data:Pwzheader;
    /// <summary>
    /// 根据版本的hash值猜测wz版本，
    /// </summary>
    /// <param name="HashVersion">版本的hash值</param>
    /// <returns></returns>
    function GuessWzVersion(HashVersion:Byte):Integer;
    function validate:Boolean;
    constructor Create(ff:TwzReader);
    function HeaderSize:Integer;
  end;


implementation

constructor TwzheaderClass.Create(ff: TwzReader);
begin
  new(data);
  ff.Read(data^, SizeOf(data^));
  if not validate then
  begin
    raise Exception.Create('Wz文件无效');
  end;
end;

function TwzheaderClass.validate: Boolean;
begin
  Result := false;
  if StrLComp(PAnsiChar(@data.singnature),'PKG1',4) = 0 then
  begin
    Result := True;
  end;
end;

function TwzheaderClass.GuessWzVersion(HashVersion:Byte):Integer;
var
  I,J: Integer;
  TmpStr:string;
  hashKey:Integer;
begin
  for I := 0 to 9999 do
  begin
    hashKey := 0;
    TmpStr := IntToStr(i);
    for j := 1 to length(TmpStr) do
    begin
      hashKey := (hashKey shl 5) + ord(TmpStr[j]) + 1;
    end;
    if ((hashKey shr 24 and $FF) xor
      (hashKey shr 16 and $FF) xor
      (hashKey shr 8 and $FF) xor
      (hashKey and $FF) xor $FF)= HashVersion then
    begin
      Result := i;
      break;
    end;
  end;
end;

function TwzheaderClass.HeaderSize: Integer;
begin
  Result := SizeOf(data^);
end;

end.
