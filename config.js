class ServerlessCloudwatchDashboardConfig {
    constructor(configObject,scd) {
        if (Array.isArray(configObject)) 
            configObject=this.convertV1Config(configObject);
        this.configObject = configObject;
        this.scd = scd;
    }

    convertV1Config(configObject) {
        var newConfig = {};
        configObject.forEach(x=>{
            newConfig[x]={
                Statistic: "Average",
                Period: 300
            };
        })
        return newConfig;
    }

    validate(validateBy,configItem) {
        if (this.validateBy.indexOf(configItem)>-1)
            return true;
        else
            throw new this.scd.serverless.classes.Error(`Error: ${configItem} is not a valid metric for dynamodb`);
    }

    forEach(callback) {
        Object.keys(this.configObject).forEach(x=>{callback(x,this.configObject[x])});
    }
}