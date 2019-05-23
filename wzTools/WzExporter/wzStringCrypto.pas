unit wzStringCrypto;

interface
uses
  ElAES;

var
  ASciiStrKey:array of byte;
  UnicodeStrKey:array of byte;
  UnhashKey:array of byte;

implementation

uses
  SysUtils, Classes;

const
  key :TAESKey256 =(
		19,0,0,0,
		8,0,0,0,
		6,0,0,0,
		180,0,0,0,
		27,0,0,0,
		15,0,0,0,
		51,0,0,0,
		82,0,0,0
	);
  ds:array[0..3] of byte =(
		$B9,
		$7D,
		$63,
		$E9
  );


function cipherdoFinal(ab: Tbytes): TBytes;
var
  inmmo, outmmo: TMemoryStream;
  I: Integer;
begin
  inmmo := TMemoryStream.Create;
  outmmo := TMemoryStream.Create;
  try
    inmmo.Write(ab[0], Length(ab));
    inmmo.Seek(0, 0);
    EncryptAESStreamECB(inmmo, 0, Key, outmmo);
    SetLength(Result, Length(ab));
    for I := 0 to Length(ab) - 1 do
    begin
      Result[i] := Pbyte(Cardinal(outmmo.Memory) + i)^;
    end;
  finally
    inmmo.free;
    outmmo.free;
  end;
end;

function multiplyBytes(ab: TBytes; Len, count: Integer): TBytes;
var
  I: Integer;
  j: Integer;
begin
  SetLength(Result, Len * count);
  for I := 0 to count - 1 do
  begin
    for j := 0 to Len - 1 do
    begin
      Result[i * len + j] := ab[j];
    end;
  end;
end;

procedure initCrytoKey;
var
  ab: Tbytes;
  I: Integer;
  keyMsk:Word;
begin
  SetLength(UnicodeStrKey, $FFFF);
  ab := multiplyBytes(TBytes(@ds), 4, 4);
  for I := 0 to $FFFF div length(ab) - 1 do
  begin
    ab := cipherdoFinal(ab);
    Move(ab[0], UnicodeStrKey[i * length(ab)], length(ab));
  end;
  //ascii
  SetLength(ASciiStrKey, $FF);
  Move(UnicodeStrKey[0], ASciiStrKey[0], length(ASciiStrKey));

  //UnhashKey
  SetLength(UnhashKey, $FFFF);
  Move(UnicodeStrKey[0], UnhashKey[0], length(UnhashKey));

  //œ»‘§À„
  keyMsk := $AAAA;
  for I := 0 to length(UnicodeStrKey) div 2 - 1 do
  begin
    UnicodeStrKey[i*2] := UnicodeStrKey[i*2] xor lo(keyMsk);
    UnicodeStrKey[i*2+1] := UnicodeStrKey[i*2+1] xor hi(keyMsk);
    keyMsk := keyMsk + 1;
  end;
  keyMsk := $AA;
  for I := 0 to length(ASciiStrKey)- 1 do
  begin
    ASciiStrKey[i] := ASciiStrKey[i] xor keyMsk;
    keyMsk := (keyMsk + 1) and $FF;
  end;
  
end;

initialization
  initCrytoKey;

end.
