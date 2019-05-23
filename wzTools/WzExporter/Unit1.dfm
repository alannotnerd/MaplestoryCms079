object Form1: TForm1
  Left = 0
  Top = 0
  Caption = 'Form1'
  ClientHeight = 562
  ClientWidth = 447
  Color = clBtnFace
  Font.Charset = DEFAULT_CHARSET
  Font.Color = clWindowText
  Font.Height = -11
  Font.Name = 'Tahoma'
  Font.Style = []
  OldCreateOrder = False
  Position = poDesigned
  OnCreate = FormCreate
  PixelsPerInch = 96
  TextHeight = 13
  object Memo1: TMemo
    Left = 0
    Top = 41
    Width = 447
    Height = 504
    Align = alClient
    Lines.Strings = (
      'Memo1')
    TabOrder = 0
  end
  object Panel1: TPanel
    Left = 0
    Top = 0
    Width = 447
    Height = 41
    Align = alTop
    Caption = 'Panel1'
    TabOrder = 1
    object Button1: TButton
      Left = 16
      Top = 10
      Width = 41
      Height = 25
      Caption = 'Button1'
      TabOrder = 0
      OnClick = Button1Click
    end
    object Button2: TButton
      Left = 120
      Top = 10
      Width = 75
      Height = 25
      Caption = 'Export'
      TabOrder = 1
      OnClick = Button2Click
    end
    object Button3: TButton
      Left = 201
      Top = 10
      Width = 75
      Height = 25
      Caption = 'EA'
      TabOrder = 2
      OnClick = Button3Click
    end
    object Button4: TButton
      Left = 56
      Top = 10
      Width = 41
      Height = 25
      Caption = 'Button4'
      TabOrder = 3
      OnClick = Button4Click
    end
    object Button5: TButton
      Left = 296
      Top = 10
      Width = 75
      Height = 25
      Caption = 'Button5'
      TabOrder = 4
      OnClick = Button5Click
    end
  end
  object ProgressBar1: TProgressBar
    Left = 0
    Top = 545
    Width = 447
    Height = 17
    Align = alBottom
    TabOrder = 2
  end
end
