export default class Version {
    Msg; // web return Msg
    code; // web status
    updateStatus; // judge whether update
    versionCode; // app versionCode
    VersionName; // app versionName
    modifyContent; // app update content
    downloadUrl; // app downLoad URL
    apkSize; // app Size
    apkMd5; // app keyTool
    constructor(options={}) {
        const{Msg, code,updateStatus, versionCode, VersionName, modifyContent, downloadUrl, apkSize,apkMd5} = options
        this.Msg = Msg;
        this.code = code;
        this.updateStatus = updateStatus;
        this.versionCode = versionCode;
        this.VersionName = VersionName;
        this.modifyContent = modifyContent;
        this.downloadUrl = downloadUrl;
        this.apkSize = apkSize;
        this.apkMd5 = apkMd5;
    }
}
