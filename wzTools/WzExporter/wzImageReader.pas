unit wzImageReader;

interface

uses
  wzReader, Classes;


function decodePngImgToStream(Stream: TMemoryStream; imageWidth,ImageHeight:Integer):TMemoryStream;
function decodePngImgToFile(Stream: TMemoryStream; imageWidth,ImageHeight:Integer; fileName:string):Boolean;


implementation

uses
  ZLib, SysUtils, pngimage, Windows;


procedure DecompressZlibStream(var EncodedStream: TMemoryStream);
var
  TmpStream:TMemoryStream;
  decompStream:TDecompressionStream;
  nRead:integer;
  buffer:array[0..1023] of Char;
begin
  TmpStream := TMemoryStream.Create;
  EncodedStream.Seek(0, 0);
  decompStream := TDecompressionStream.Create(EncodedStream);
  try
    repeat
      nRead := decompStream.Read(buffer,1024);
      TmpStream.Write(buffer, nRead);
    until nread=0;
    TmpStream.Seek(0, 0);
    EncodedStream.SetSize(0);
    EncodedStream.CopyFrom(TmpStream, TmpStream.Size);
    EncodedStream.Seek(0, 0);
  finally
    decompStream.Free;
    TmpStream.Free;
  end;

end;

function decodeImgStream1(ff:TwzReader; dataSize:Integer):TMemoryStream;
var
  EncodedStream: TMemoryStream;
  decompStream:TDecompressionStream;
  nRead:integer;
  buffer:array[0..1023] of Char;
begin
  EncodedStream := TMemoryStream.Create;
  try
    EncodedStream.CopyFrom(ff, dataSize - 1); //跳过了第一个字符，貌似像类型
    EncodedStream.Seek(0, 0);
    decompStream := TDecompressionStream.Create(EncodedStream);
    try
      Result := TMemoryStream.Create;
      repeat
        nRead := decompStream.Read(buffer,1024);
        Result.Write(buffer, nRead);
      until nread=0;
      Result.Seek(0, 0);
    finally
      decompStream.Free;
    end;
  finally
    EncodedStream.Free;
  end;
end;

function argb16TOrgba32(aShort:Word):Integer;
var
  a,r,g,b:DWORD;
begin             //$F753  --  >> $FF335577
  if aShort = 0 then
  begin
    Result := 0;
    Exit;
  end;

  //Alpha值的范围是0到255，其中0表示完全透明的颜色，255表示完全不透明的颜色
  a := ((aShort shr 12) and $0F) or ((aShort shr 8) and $F0);   //$FF
  r := ((aShort shr 8) and $0F) or ((aShort shr 4) and $F0);   //$77
  g := ((aShort shr 4) and $0F) or (aShort and $F0);   //$55
  b := (aShort and $0F) or ((aShort shl 4) and $F0);   //$33

  Result := CMYK(a, b, g, r);
end;

function GenPngFromStream(buf:TMemoryStream; width, height:Integer):TPNGObject;
var
  I: Integer;
  j: Integer;
  cl16:Word;
  Alpha:pByteArray;
  cl:Integer;
begin
  Result := TPNGObject.CreateBlank(COLOR_RGBALPHA, 8, width, height);
  for I := 0 to height - 1 do
  begin
    Alpha := Result.AlphaScanline[I];
    for j := 0 to width - 1 do
    begin
      buf.Read(cl16, 2);
      cl := argb16TOrgba32(cl16);
      Result.Pixels[j,i] := cl;
      Alpha[j] := (cl shr 24) and $FF;
    end;
  end;
end;

function decodePngImgToStream(Stream: TMemoryStream; imageWidth,ImageHeight:Integer):TMemoryStream;
var
  png:TPNGObject;
begin
  DecompressZlibStream(Stream);
  png := GenPngFromStream(Stream, imageWidth, ImageHeight);
  Result := TMemoryStream.Create;
  png.SaveToStream(Result);
  Result.Seek(0, 0);
  png.Free;
end;


function CheckPath(aPath:string):string;
begin
  Result := aPath;
  while Pos('\\',Result) > 0 do
    Result := StringReplace(Result,'\\','\',[rfReplaceAll]);

end;

function decodePngImgToFile(Stream: TMemoryStream; imageWidth,ImageHeight:Integer; fileName:string):Boolean;
begin
  fileName := CheckPath(fileName);
  with decodePngImgToStream(Stream, imageWidth, ImageHeight) do
  begin
    ForceDirectories(ExtractFilePath(fileName));
    SaveToFile(fileName);
    Free;
    Result := True;
  end;
end;


end.
