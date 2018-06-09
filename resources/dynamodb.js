class DynamoDb {
    constructor(serverlesscloudwatchdashboard,config) {
        this.scd = serverlesscloudwatchdashboard;
        this.metric_config = config.metrics || ["ConsumedReadCapacityUnits","ConsumedWriteCapacityUnits"];
        this.validConfigs = [
            "ConditionalCheckFailedRequests",
            "ConsumedReadCapacityUnits",
            "ConsumedWriteCapacityUnits",
            "ReadThrottleEvents",
            "ReturnedBytes",
            "ReturnedItemCount",
            "ReturnedRecordsCount",
            "SuccessfulRequestLatency",
            "SystemErrors",
            "TimeToLiveDeletedItemCount",
            "ThrottledRequests",
            "UserErrors",
            "WriteThrottleEvents"
        ];

    }
    
    validateConfig(configItem) {
        if (validConfigs.indexOf(configItem)==0)
            return true;
        else
            throw new this.serverless.classes.Error(`Error: ${configItem} is not a valid metric for dynamodb`);
    }

    createWidget(name,resource) {
        this.scd.log("Creating widgets for "+name+" "+resource.Properties.TableName);
        var widgets = [];
        this.metric_config.forEach(metric=>{
            widgets.push({
                shouldBeDelimited: true,
                value: JSON.stringify({
                "type": "metric",
                "properties": {
                    "metrics": [
                        ["AWS/DynamoDB",metric,"TableName",resource.Properties.TableName]
                    ],
                    "period": 300,
                    "region": this.scd.options.region,
                    "title": `${resource.Properties.TableName} ${metric}`
                }
            })});
        })
        return widgets;
    }
}

module.exports = DynamoDb;