class Lambda {
    constructor(serverlesscloudwatchdashboard,config) {
        this.scd = serverlesscloudwatchdashboard;
        this.metric_config = config.metrics || ["Invocations","Error","Duration"];
        this.validConfigs = [
            "Invocations",
            "Errors",
            "Dead Letter Errors",
            "Duration",
            "Throttles",
            "IteratorAge",
            "ConcurrentExceptions",
            "UnreservedConcurrentExceptions"
        ];

    }
    
    validateConfig(configItem) {
        if (validConfigs.indexOf(configItem)==0)
            return true;
        else
            throw new this.serverless.classes.Error(`Error: ${configItem} is not a valid metric for lambda`);
    }

    createWidget(name,resource) {
        this.scd.log("Creating function widgets for "+name+" "+resource.Properties.FunctionName);
        var widgets = [];
        this.metric_config.forEach(metric=>{
            widgets.push({
                shouldBeDelimited: true,
                value: JSON.stringify({
                "type": "metric",
                "properties": {
                    "metrics": [
                        ["AWS/Lambda",metric,"FunctionName",resource.Properties.FunctionName]
                    ],
                    "period": 300,
                    "region": this.scd.options.region,
                    "title": `${name} ${metric}`
                }
            })});
        })
        return widgets;
    }
}

module.exports = Lambda;