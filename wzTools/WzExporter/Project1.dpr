program Project1;

uses
  Forms,
  Unit1 in 'Unit1.pas' {Form1},
  wzhelper in 'wzhelper.pas',
  ElAES in 'G:\Delphi\Ëã·¨\ElAES.pas',
  wzReader in 'wzReader.pas',
  wzStringCrypto in 'wzStringCrypto.pas',
  wideStrList in 'wideStrList.pas',
  wzImageReader in 'wzImageReader.pas',
  wzConst in 'wzConst.pas';

{$R *.res}

begin
  Application.Initialize;
  Application.MainFormOnTaskbar := True;
  Application.CreateForm(TForm1, Form1);
  Application.Run;
end.
