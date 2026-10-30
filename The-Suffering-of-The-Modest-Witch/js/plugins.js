// This file was generated using SLR Translator
// v2.030
var $plugins =
[
  {
    "name": "PluginCommonBase",
    "status": true,
    "description": "パラメータ解析を提供する共通基盤です",
    "parameters": {}
  },
  {
    "name": "ParallelBgs",
    "status": true,
    "description": "BGS並行演奏プラグイン",
    "parameters": {}
  },
  {
    "name": "TriggerOnEquipAndState",
    "status": true,
    "description": "装備変更時の変数操作プラグイン",
    "parameters": {
      "list": "[\"{\\\"name\\\":\\\"\\\",\\\"weaponId\\\":\\\"0\\\",\\\"armorId\\\":\\\"1\\\",\\\"stateId\\\":\\\"0\\\",\\\"equipType\\\":\\\"0\\\",\\\"weaponType\\\":\\\"0\\\",\\\"armorType\\\":\\\"0\\\",\\\"list\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"targetSwitch\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"targetVariable\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"addActorId\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"operand\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\",\"{\\\"name\\\":\\\"\\\",\\\"weaponId\\\":\\\"0\\\",\\\"armorId\\\":\\\"2\\\",\\\"stateId\\\":\\\"0\\\",\\\"equipType\\\":\\\"0\\\",\\\"weaponType\\\":\\\"0\\\",\\\"armorType\\\":\\\"0\\\",\\\"list\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"targetSwitch\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"targetVariable\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"addActorId\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"operand\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\",\"{\\\"name\\\":\\\"\\\",\\\"weaponId\\\":\\\"0\\\",\\\"armorId\\\":\\\"3\\\",\\\"stateId\\\":\\\"0\\\",\\\"equipType\\\":\\\"0\\\",\\\"weaponType\\\":\\\"0\\\",\\\"armorType\\\":\\\"0\\\",\\\"list\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"targetSwitch\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"targetVariable\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"addActorId\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"operand\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\",\"{\\\"name\\\":\\\"\\\",\\\"weaponId\\\":\\\"0\\\",\\\"armorId\\\":\\\"4\\\",\\\"stateId\\\":\\\"0\\\",\\\"equipType\\\":\\\"0\\\",\\\"weaponType\\\":\\\"0\\\",\\\"armorType\\\":\\\"0\\\",\\\"list\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"targetSwitch\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"4\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"targetVariable\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"addActorId\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"operand\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\",\"{\\\"name\\\":\\\"\\\",\\\"weaponId\\\":\\\"0\\\",\\\"armorId\\\":\\\"5\\\",\\\"stateId\\\":\\\"0\\\",\\\"equipType\\\":\\\"0\\\",\\\"weaponType\\\":\\\"0\\\",\\\"armorType\\\":\\\"0\\\",\\\"list\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"targetSwitch\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"targetVariable\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"addActorId\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"operand\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\",\"{\\\"name\\\":\\\"\\\",\\\"weaponId\\\":\\\"0\\\",\\\"armorId\\\":\\\"6\\\",\\\"stateId\\\":\\\"0\\\",\\\"equipType\\\":\\\"0\\\",\\\"weaponType\\\":\\\"0\\\",\\\"armorType\\\":\\\"0\\\",\\\"list\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"targetSwitch\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"6\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"targetVariable\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"addActorId\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"operand\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\",\"{\\\"name\\\":\\\"\\\",\\\"weaponId\\\":\\\"0\\\",\\\"armorId\\\":\\\"7\\\",\\\"stateId\\\":\\\"0\\\",\\\"equipType\\\":\\\"0\\\",\\\"weaponType\\\":\\\"0\\\",\\\"armorType\\\":\\\"0\\\",\\\"list\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"targetSwitch\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"7\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"targetVariable\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"addActorId\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"operand\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\",\"{\\\"name\\\":\\\"\\\",\\\"weaponId\\\":\\\"0\\\",\\\"armorId\\\":\\\"8\\\",\\\"stateId\\\":\\\"0\\\",\\\"equipType\\\":\\\"0\\\",\\\"weaponType\\\":\\\"0\\\",\\\"armorType\\\":\\\"0\\\",\\\"list\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"targetSwitch\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"8\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"targetVariable\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"addActorId\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"operand\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\",\"{\\\"name\\\":\\\"\\\",\\\"weaponId\\\":\\\"0\\\",\\\"armorId\\\":\\\"9\\\",\\\"stateId\\\":\\\"0\\\",\\\"equipType\\\":\\\"0\\\",\\\"weaponType\\\":\\\"0\\\",\\\"armorType\\\":\\\"0\\\",\\\"list\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"targetSwitch\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"9\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"targetVariable\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"addActorId\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"operand\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\",\"{\\\"name\\\":\\\"\\\",\\\"weaponId\\\":\\\"0\\\",\\\"armorId\\\":\\\"10\\\",\\\"stateId\\\":\\\"0\\\",\\\"equipType\\\":\\\"0\\\",\\\"weaponType\\\":\\\"0\\\",\\\"armorType\\\":\\\"0\\\",\\\"list\\\":\\\"[\\\\\\\"{\\\\\\\\\\\\\\\"targetSwitch\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"10\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"targetVariable\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"addActorId\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"false\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"operand\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\"]\\\"}\"]",
      "battleMemberOnly": "false"
    }
  },
  {
    "name": "LL_StandingPicture",
    "status": true,
    "description": "メッセージウィンドウ表示時に立ち絵を表示します。",
    "parameters": {
      "sPictures": "[\"{\\\"id\\\":\\\"hadaka\\\",\\\"imageName\\\":\\\"主人公_裸\\\",\\\"imageNameBlink\\\":\\\"\\\",\\\"imageNameBlink2\\\":\\\"\\\",\\\"origin\\\":\\\"0\\\",\\\"x\\\":\\\"620\\\",\\\"y\\\":\\\"16\\\",\\\"x2\\\":\\\"20\\\",\\\"y2\\\":\\\"96\\\",\\\"x3\\\":\\\"364\\\",\\\"y3\\\":\\\"96\\\",\\\"x4\\\":\\\"120\\\",\\\"y4\\\":\\\"96\\\",\\\"reverse\\\":\\\"1\\\",\\\"scaleX\\\":\\\"100\\\",\\\"scaleY\\\":\\\"100\\\",\\\"opacity\\\":\\\"255\\\",\\\"blendMode\\\":\\\"0\\\"}\",\"{\\\"id\\\":\\\"hudan\\\",\\\"imageName\\\":\\\"主人公\\\",\\\"imageNameBlink\\\":\\\"\\\",\\\"imageNameBlink2\\\":\\\"\\\",\\\"origin\\\":\\\"0\\\",\\\"x\\\":\\\"620\\\",\\\"y\\\":\\\"16\\\",\\\"x2\\\":\\\"20\\\",\\\"y2\\\":\\\"96\\\",\\\"x3\\\":\\\"364\\\",\\\"y3\\\":\\\"96\\\",\\\"x4\\\":\\\"120\\\",\\\"y4\\\":\\\"96\\\",\\\"reverse\\\":\\\"1\\\",\\\"scaleX\\\":\\\"100\\\",\\\"scaleY\\\":\\\"100\\\",\\\"opacity\\\":\\\"255\\\",\\\"blendMode\\\":\\\"0\\\"}\",\"{\\\"id\\\":\\\"syudo\\\",\\\"imageName\\\":\\\"主人公_修道服\\\",\\\"imageNameBlink\\\":\\\"\\\",\\\"imageNameBlink2\\\":\\\"\\\",\\\"origin\\\":\\\"0\\\",\\\"x\\\":\\\"620\\\",\\\"y\\\":\\\"16\\\",\\\"x2\\\":\\\"20\\\",\\\"y2\\\":\\\"96\\\",\\\"x3\\\":\\\"364\\\",\\\"y3\\\":\\\"96\\\",\\\"x4\\\":\\\"120\\\",\\\"y4\\\":\\\"96\\\",\\\"reverse\\\":\\\"1\\\",\\\"scaleX\\\":\\\"100\\\",\\\"scaleY\\\":\\\"100\\\",\\\"opacity\\\":\\\"255\\\",\\\"blendMode\\\":\\\"0\\\"}\",\"{\\\"id\\\":\\\"china\\\",\\\"imageName\\\":\\\"主人公_チャイナ\\\",\\\"imageNameBlink\\\":\\\"\\\",\\\"imageNameBlink2\\\":\\\"\\\",\\\"origin\\\":\\\"0\\\",\\\"x\\\":\\\"620\\\",\\\"y\\\":\\\"16\\\",\\\"x2\\\":\\\"20\\\",\\\"y2\\\":\\\"96\\\",\\\"x3\\\":\\\"364\\\",\\\"y3\\\":\\\"96\\\",\\\"x4\\\":\\\"120\\\",\\\"y4\\\":\\\"96\\\",\\\"reverse\\\":\\\"1\\\",\\\"scaleX\\\":\\\"100\\\",\\\"scaleY\\\":\\\"100\\\",\\\"opacity\\\":\\\"255\\\",\\\"blendMode\\\":\\\"0\\\"}\",\"{\\\"id\\\":\\\"usi\\\",\\\"imageName\\\":\\\"主人公_牛コス\\\",\\\"imageNameBlink\\\":\\\"\\\",\\\"imageNameBlink2\\\":\\\"\\\",\\\"origin\\\":\\\"0\\\",\\\"x\\\":\\\"620\\\",\\\"y\\\":\\\"16\\\",\\\"x2\\\":\\\"20\\\",\\\"y2\\\":\\\"96\\\",\\\"x3\\\":\\\"364\\\",\\\"y3\\\":\\\"96\\\",\\\"x4\\\":\\\"120\\\",\\\"y4\\\":\\\"96\\\",\\\"reverse\\\":\\\"1\\\",\\\"scaleX\\\":\\\"100\\\",\\\"scaleY\\\":\\\"100\\\",\\\"opacity\\\":\\\"255\\\",\\\"blendMode\\\":\\\"0\\\"}\",\"{\\\"id\\\":\\\"hadaka2\\\",\\\"imageName\\\":\\\"主人公_日焼け\\\",\\\"imageNameBlink\\\":\\\"\\\",\\\"imageNameBlink2\\\":\\\"\\\",\\\"origin\\\":\\\"0\\\",\\\"x\\\":\\\"620\\\",\\\"y\\\":\\\"16\\\",\\\"x2\\\":\\\"20\\\",\\\"y2\\\":\\\"96\\\",\\\"x3\\\":\\\"364\\\",\\\"y3\\\":\\\"96\\\",\\\"x4\\\":\\\"120\\\",\\\"y4\\\":\\\"96\\\",\\\"reverse\\\":\\\"1\\\",\\\"scaleX\\\":\\\"100\\\",\\\"scaleY\\\":\\\"100\\\",\\\"opacity\\\":\\\"255\\\",\\\"blendMode\\\":\\\"0\\\"}\",\"{\\\"id\\\":\\\"hudan2\\\",\\\"imageName\\\":\\\"主人公_通常_日焼け\\\",\\\"imageNameBlink\\\":\\\"\\\",\\\"imageNameBlink2\\\":\\\"\\\",\\\"origin\\\":\\\"0\\\",\\\"x\\\":\\\"620\\\",\\\"y\\\":\\\"16\\\",\\\"x2\\\":\\\"20\\\",\\\"y2\\\":\\\"96\\\",\\\"x3\\\":\\\"364\\\",\\\"y3\\\":\\\"96\\\",\\\"x4\\\":\\\"120\\\",\\\"y4\\\":\\\"96\\\",\\\"reverse\\\":\\\"1\\\",\\\"scaleX\\\":\\\"100\\\",\\\"scaleY\\\":\\\"100\\\",\\\"opacity\\\":\\\"255\\\",\\\"blendMode\\\":\\\"0\\\"}\",\"{\\\"id\\\":\\\"syudo2\\\",\\\"imageName\\\":\\\"主人公_修道服_日焼け\\\",\\\"imageNameBlink\\\":\\\"\\\",\\\"imageNameBlink2\\\":\\\"\\\",\\\"origin\\\":\\\"0\\\",\\\"x\\\":\\\"620\\\",\\\"y\\\":\\\"16\\\",\\\"x2\\\":\\\"20\\\",\\\"y2\\\":\\\"96\\\",\\\"x3\\\":\\\"364\\\",\\\"y3\\\":\\\"96\\\",\\\"x4\\\":\\\"120\\\",\\\"y4\\\":\\\"96\\\",\\\"reverse\\\":\\\"1\\\",\\\"scaleX\\\":\\\"100\\\",\\\"scaleY\\\":\\\"100\\\",\\\"opacity\\\":\\\"255\\\",\\\"blendMode\\\":\\\"0\\\"}\",\"{\\\"id\\\":\\\"china2\\\",\\\"imageName\\\":\\\"主人公_チャイナ_日焼け\\\",\\\"imageNameBlink\\\":\\\"\\\",\\\"imageNameBlink2\\\":\\\"\\\",\\\"origin\\\":\\\"0\\\",\\\"x\\\":\\\"620\\\",\\\"y\\\":\\\"16\\\",\\\"x2\\\":\\\"20\\\",\\\"y2\\\":\\\"96\\\",\\\"x3\\\":\\\"364\\\",\\\"y3\\\":\\\"96\\\",\\\"x4\\\":\\\"120\\\",\\\"y4\\\":\\\"96\\\",\\\"reverse\\\":\\\"1\\\",\\\"scaleX\\\":\\\"100\\\",\\\"scaleY\\\":\\\"100\\\",\\\"opacity\\\":\\\"255\\\",\\\"blendMode\\\":\\\"0\\\"}\",\"{\\\"id\\\":\\\"usi2\\\",\\\"imageName\\\":\\\"主人公_牛コス_日焼け\\\",\\\"imageNameBlink\\\":\\\"\\\",\\\"imageNameBlink2\\\":\\\"\\\",\\\"origin\\\":\\\"0\\\",\\\"x\\\":\\\"620\\\",\\\"y\\\":\\\"16\\\",\\\"x2\\\":\\\"20\\\",\\\"y2\\\":\\\"96\\\",\\\"x3\\\":\\\"364\\\",\\\"y3\\\":\\\"96\\\",\\\"x4\\\":\\\"120\\\",\\\"y4\\\":\\\"96\\\",\\\"reverse\\\":\\\"1\\\",\\\"scaleX\\\":\\\"100\\\",\\\"scaleY\\\":\\\"100\\\",\\\"opacity\\\":\\\"255\\\",\\\"blendMode\\\":\\\"0\\\"}\"]",
      "pictureSettings1": "",
      "transition": "1",
      "priority": "inFrontOfPicture",
      "pictureSettings2": "",
      "transition2": "1",
      "priority2": "inFrontOfPicture",
      "pictureSettings3": "",
      "transition3": "1",
      "priority3": "inFrontOfPicture",
      "pictureSettings4": "",
      "transition4": "1",
      "priority4": "inFrontOfPicture",
      "pictureSettings5": "{\"transition\":\"1\",\"priority\":\"inFrontOfPicture\"}",
      "pictureSettings6": "{\"transition\":\"1\",\"priority\":\"inFrontOfPicture\"}",
      "pictureSettings7": "{\"transition\":\"1\",\"priority\":\"inFrontOfPicture\"}",
      "pictureSettings8": "{\"transition\":\"1\",\"priority\":\"inFrontOfPicture\"}",
      "blinkSettings": "",
      "blinkInterval": "180",
      "blinkWaitCount": "4",
      "focusToneAdjust": "-96",
      "betweenPicturesPriority": "50",
      "bootCachePictures": "true"
    }
  },
  {
    "name": "MessageWindowHidden",
    "status": true,
    "description": "メッセージウィンドウ一時消去プラグイン",
    "parameters": {
      "triggerButton": "[\"右クリック\"]",
      "triggerSwitch": "0",
      "syncSwitch": "false",
      "linkPictureNumbers": "[]",
      "linkShowPictureNumbers": "[]",
      "disableLinkSwitchId": "0",
      "disableSwitchId": "0",
      "disableInBattle": "false",
      "disableInChoice": "true",
      "restoreByDecision": "false"
    }
  },
  {
    "name": "NRP_MessageWindow",
    "status": true,
    "description": "v1.045 メッセージウィンドウを調整する。",
    "parameters": {
      "<MessageWindow>": "",
      "WindowWidth": "Graphics.boxWidth",
      "WindowHeight": "this.fittingHeight(3) + 8",
      "WindowX": "",
      "WindowY": "(this._positionType * (Graphics.boxHeight - this.height)) / 2",
      "LineHeight": "",
      "AdjustMessageX": "",
      "AdjustMessageY": "",
      "MessageFontSize": "",
      "WindowOpacity": "",
      "HideWindowFrame": "false",
      "WindowImage": "",
      "AdjustWindowImageX": "",
      "AdjustWindowImageY": "",
      "WindowImageName": "",
      "MaskImage": "",
      "NoMaskOpacity": "",
      "FixIconY": "true",
      "<NameBoxWindow>": "",
      "NameBoxAdjustX": "",
      "NameBoxAdjustY": "",
      "NameBoxFontSize": "",
      "NameBoxOpacity": "",
      "HideNameBoxFrame": "false",
      "OverlapNameBox": "false",
      "NameBoxImage": "",
      "AdjustNameBoxImageX": "",
      "AdjustNameBoxImageY": "",
      "<ChoiceWindow>": "",
      "FixChoiceX": "true"
    }
  },
  {
    "name": "LL_MessageWindowAdjust",
    "status": true,
    "description": "メッセージウィンドウの幅を調整します。",
    "parameters": {
      "adjustWindowChoiceList": "true",
      "adjustOnBattle": "false",
      "adjustWindowType": "all",
      "adjustOnFace": "0",
      "adjustNoFace": "0"
    }
  },
  {
    "name": "LL_MenuScreenBase",
    "status": true,
    "description": "メニュー画面立ち絵設定の共通ベースプラグインです。",
    "parameters": {
      "menuPictures": "[\"{\\\"actorId\\\":\\\"1\\\",\\\"stateId\\\":\\\"0\\\",\\\"switchId\\\":\\\"2\\\",\\\"variableCase\\\":\\\"\\\",\\\"hpPercentage\\\":\\\"100\\\",\\\"imageName\\\":\\\"主人公\\\",\\\"x\\\":\\\"370\\\",\\\"y\\\":\\\"0\\\",\\\"scaleX\\\":\\\"80\\\",\\\"scaleY\\\":\\\"80\\\"}\",\"{\\\"actorId\\\":\\\"1\\\",\\\"stateId\\\":\\\"0\\\",\\\"switchId\\\":\\\"1\\\",\\\"variableCase\\\":\\\"\\\",\\\"hpPercentage\\\":\\\"100\\\",\\\"imageName\\\":\\\"主人公_裸\\\",\\\"x\\\":\\\"370\\\",\\\"y\\\":\\\"0\\\",\\\"scaleX\\\":\\\"80\\\",\\\"scaleY\\\":\\\"80\\\"}\",\"{\\\"actorId\\\":\\\"1\\\",\\\"stateId\\\":\\\"0\\\",\\\"switchId\\\":\\\"3\\\",\\\"variableCase\\\":\\\"\\\",\\\"hpPercentage\\\":\\\"100\\\",\\\"imageName\\\":\\\"主人公_修道服\\\",\\\"x\\\":\\\"370\\\",\\\"y\\\":\\\"0\\\",\\\"scaleX\\\":\\\"80\\\",\\\"scaleY\\\":\\\"80\\\"}\",\"{\\\"actorId\\\":\\\"1\\\",\\\"stateId\\\":\\\"0\\\",\\\"switchId\\\":\\\"4\\\",\\\"variableCase\\\":\\\"\\\",\\\"hpPercentage\\\":\\\"100\\\",\\\"imageName\\\":\\\"主人公_チャイナ\\\",\\\"x\\\":\\\"370\\\",\\\"y\\\":\\\"0\\\",\\\"scaleX\\\":\\\"80\\\",\\\"scaleY\\\":\\\"80\\\"}\",\"{\\\"actorId\\\":\\\"1\\\",\\\"stateId\\\":\\\"0\\\",\\\"switchId\\\":\\\"5\\\",\\\"variableCase\\\":\\\"\\\",\\\"hpPercentage\\\":\\\"100\\\",\\\"imageName\\\":\\\"主人公_牛コス\\\",\\\"x\\\":\\\"370\\\",\\\"y\\\":\\\"0\\\",\\\"scaleX\\\":\\\"80\\\",\\\"scaleY\\\":\\\"80\\\"}\",\"{\\\"actorId\\\":\\\"1\\\",\\\"stateId\\\":\\\"0\\\",\\\"switchId\\\":\\\"6\\\",\\\"variableCase\\\":\\\"\\\",\\\"hpPercentage\\\":\\\"100\\\",\\\"imageName\\\":\\\"主人公_日焼け\\\",\\\"x\\\":\\\"370\\\",\\\"y\\\":\\\"0\\\",\\\"scaleX\\\":\\\"80\\\",\\\"scaleY\\\":\\\"80\\\"}\",\"{\\\"actorId\\\":\\\"1\\\",\\\"stateId\\\":\\\"0\\\",\\\"switchId\\\":\\\"7\\\",\\\"variableCase\\\":\\\"\\\",\\\"hpPercentage\\\":\\\"100\\\",\\\"imageName\\\":\\\"主人公_通常_日焼け\\\",\\\"x\\\":\\\"370\\\",\\\"y\\\":\\\"0\\\",\\\"scaleX\\\":\\\"80\\\",\\\"scaleY\\\":\\\"80\\\"}\",\"{\\\"actorId\\\":\\\"1\\\",\\\"stateId\\\":\\\"0\\\",\\\"switchId\\\":\\\"8\\\",\\\"variableCase\\\":\\\"\\\",\\\"hpPercentage\\\":\\\"100\\\",\\\"imageName\\\":\\\"主人公_修道服_日焼け\\\",\\\"x\\\":\\\"370\\\",\\\"y\\\":\\\"0\\\",\\\"scaleX\\\":\\\"80\\\",\\\"scaleY\\\":\\\"80\\\"}\",\"{\\\"actorId\\\":\\\"1\\\",\\\"stateId\\\":\\\"0\\\",\\\"switchId\\\":\\\"9\\\",\\\"variableCase\\\":\\\"\\\",\\\"hpPercentage\\\":\\\"100\\\",\\\"imageName\\\":\\\"主人公_チャイナ_日焼け\\\",\\\"x\\\":\\\"370\\\",\\\"y\\\":\\\"0\\\",\\\"scaleX\\\":\\\"80\\\",\\\"scaleY\\\":\\\"80\\\"}\",\"{\\\"actorId\\\":\\\"1\\\",\\\"stateId\\\":\\\"0\\\",\\\"switchId\\\":\\\"10\\\",\\\"variableCase\\\":\\\"\\\",\\\"hpPercentage\\\":\\\"100\\\",\\\"imageName\\\":\\\"主人公_牛コス_日焼け\\\",\\\"x\\\":\\\"370\\\",\\\"y\\\":\\\"0\\\",\\\"scaleX\\\":\\\"80\\\",\\\"scaleY\\\":\\\"80\\\"}\"]",
      "onSpbPlugin": "",
      "onSpbPluginEnable": "false"
    }
  },
  {
    "name": "LL_MenuScreenCustom",
    "status": true,
    "description": "メニュー画面レイアウトをカスタマイズします。",
    "parameters": {
      "menuSettings": "",
      "leftInputMode": "true",
      "numVisibleRows": "1",
      "maxCols": "1",
      "currencyWindowPosition": "helpWindowRightBottom",
      "backgroundImages": "[]",
      "layoutSettings": "",
      "actorNameLH": "0",
      "actorNameX": "0",
      "actorLevelLH": "-1",
      "actorLevelX": "0",
      "actorIconLH": "-1",
      "actorIconX": "0",
      "actorClassLH": "-1",
      "actorClassX": "0",
      "actorGaugeLH": "-1",
      "actorGaugeX": "0",
      "lvPadding": "84",
      "gaugeWidth": "128",
      "pictureSettings": "",
      "showStandingPicture": "true",
      "menuWindowPictureX": "0",
      "menuWindowPictureY": "0",
      "menuWindowPictureScale": "100",
      "menuHelpSettings": "",
      "menuHelpWindowEnable": "true",
      "menuHelpTexts": "[\"{\\\"symbol\\\":\\\"Item\\\",\\\"helpText\\\":\\\"Use an item you have obtained.\\\"}\",\"{\\\"symbol\\\":\\\"Skill\\\",\\\"helpText\\\":\\\"Use a skill you have learned.\\\"}\",\"{\\\"symbol\\\":\\\"Equip\\\",\\\"helpText\\\":\\\"Change equipment.\\\"}\",\"{\\\"symbol\\\":\\\"Status\\\",\\\"helpText\\\":\\\"Check status.\\\"}\",\"{\\\"symbol\\\":\\\"Sort\\\",\\\"helpText\\\":\\\"Change the partys formation order.\\\"}\",\"{\\\"symbol\\\":\\\"Options\\\",\\\"helpText\\\":\\\"Open the options screen.\\\"}\",\"{\\\"symbol\\\":\\\"Save\\\",\\\"helpText\\\":\\\"Open the save screen.\\\"}\",\"{\\\"symbol\\\":\\\"Game End\\\",\\\"helpText\\\":\\\"Quit the game.\\\"}\"]",
      "leftBlockLabel": "Lewdness: ",
      "leftBlockValue": "$gameVariables.value(1)   // 変数ID:1の値",
      "leftBlockAlign": "left",
      "rightBlockLabel": "Play Time:",
      "rightBlockValue": "$gameSystem.playtimeText()   // プレイ時間",
      "rightBlockAlign": "right",
      "rightBottomBlockLabel": "",
      "rightBottomBlockValue": "",
      "rightBottomBlockAlign": "left",
      "leftBottomBlockLabel": "",
      "leftBottomBlockValue": "",
      "leftBottomBlockAlign": "left"
    }
  },
  {
    "name": "quipOnlyArmor_MZ",
    "status": true,
    "description": "",
    "parameters": {}
  },
  {
    "name": "LoopBalloon_MZ",
    "status": true,
    "description": "条件付きフキダシループ表示プラグイン（スイッチ・変数対応）",
    "parameters": {
      "BalloonInterval": "120",
      "BalloonId": "4",
      "ConditionSwitch": "12",
      "ConditionVariable": "0",
      "ConditionValue": "0"
    }
  },
  {
    "name": "UTA_MessageSkip",
    "status": true,
    "description": "特定キーを押す事でメッセージをスキップできるようにします。",
    "parameters": {
      "Skip Key": "control",
      "Show Trace": "false"
    }
  },
  {
    "name": "CBR_EroStatus",
    "status": true,
    "description": "エロステータスを追加します",
    "parameters": {
      "SE": "Cursor3",
      "SEvol": "80",
      "window": "true",
      "font": ""
    }
  },
  {
    "name": "EventSkip",
    "status": true,
    "description": "イベントスキッププラグイン",
    "parameters": {
      "skipSwitchId": "20",
      "skipSpeed": "32",
      "fadeFrame": "8",
      "pictureFadeImage": "",
      "loadingSpinner": "false"
    }
  },
  {
    "name": "NRP_CharacterDirectionPriority",
    "status": true,
    "description": "v1.00 キャラクターの向き固定時も向き変更を有効に",
    "parameters": {}
  },
  {
    "name": "ShowMenuVariables_MZ",
    "status": true,
    "description": "メニュー画面に複数の変数を表示します（MZ対応・安定版）v1.4",
    "parameters": {
      "Variables": "[\"{\\\"VariableID\\\":\\\"2\\\",\\\"Label\\\":\\\"Sex Count\\\",\\\"X\\\":\\\"328\\\",\\\"Y\\\":\\\"200\\\",\\\"Color\\\":\\\"0\\\"}\",\"{\\\"VariableID\\\":\\\"10\\\",\\\"Label\\\":\\\"Ejaculations\\\",\\\"X\\\":\\\"328\\\",\\\"Y\\\":\\\"240\\\",\\\"Color\\\":\\\"0\\\"}\",\"{\\\"VariableID\\\":\\\"3\\\",\\\"Label\\\":\\\"Orgasm Count\\\",\\\"X\\\":\\\"328\\\",\\\"Y\\\":\\\"280\\\",\\\"Color\\\":\\\"0\\\"}\",\"{\\\"VariableID\\\":\\\"4\\\",\\\"Label\\\":\\\"Creampie Count\\\",\\\"X\\\":\\\"328\\\",\\\"Y\\\":\\\"320\\\",\\\"Color\\\":\\\"0\\\"}\",\"{\\\"VariableID\\\":\\\"5\\\",\\\"Label\\\":\\\"Blowjob\\\",\\\"X\\\":\\\"328\\\",\\\"Y\\\":\\\"360\\\",\\\"Color\\\":\\\"0\\\"}\",\"{\\\"VariableID\\\":\\\"6\\\",\\\"Label\\\":\\\"Handjob\\\",\\\"X\\\":\\\"328\\\",\\\"Y\\\":\\\"400\\\",\\\"Color\\\":\\\"0\\\"}\",\"{\\\"VariableID\\\":\\\"7\\\",\\\"Label\\\":\\\"Paizuri\\\",\\\"X\\\":\\\"328\\\",\\\"Y\\\":\\\"440\\\",\\\"Color\\\":\\\"0\\\"}\",\"{\\\"VariableID\\\":\\\"8\\\",\\\"Label\\\":\\\"Anal\\\",\\\"X\\\":\\\"328\\\",\\\"Y\\\":\\\"480\\\",\\\"Color\\\":\\\"0\\\"}\",\"{\\\"VariableID\\\":\\\"9\\\",\\\"Label\\\":\\\"Outdoors\\\",\\\"X\\\":\\\"328\\\",\\\"Y\\\":\\\"520\\\",\\\"Color\\\":\\\"0\\\"}\"]"
    }
  },
  {
    "name": "ChoiceList2",
    "status": true,
    "description": "「選択肢の表示」の選択肢に選択可否の制約を導入します。",
    "parameters": {}
  },
  {
    "name": "VerticalShakeOnly",
    "status": true,
    "description": "横方向のシェイクを縦方向に変換するプラグイン",
    "parameters": {}
  },
  {
    "name": "CommonAllScene",
    "status": true,
    "description": "全シーン実行コモンイベントプラグイン",
    "parameters": {
      "commonEventId": "220"
    }
  },
  {
    "name": "MaxItem",
    "status": true,
    "description": "アイテムの最大所持数変更 Ver1.6.8(2023/12/9)",
    "parameters": {
      "MaxItem": "1",
      "MaxDigits": "0000",
      "MaxCol": "2",
      "AutoSell": "false",
      "SellRate": "0.50",
      "MaxItemMetaName": "Max Held",
      "MaxDigitsMetaName": "Max Digits"
    }
  },
  {
    "name": "NAPI_LimitedOneShop",
    "status": true,
    "description": "一点物ショッププラグイン",
    "parameters": {}
  }
];