# serverless-cloudwatch-dashboard
A serverless plugin for generating a cloudwatch dashboard with widgets for the resources defined in the serverless.yml file.  

# Install
```
npm install serverless-cloudwatch-dashboard
```
# Usage
## serverless.yml
In the serverless.yml file the plugin needs to be added.  

```yaml
plugins:
  - serverless-cloudwatch-dashboard
```
This will add the plugin and dashboards will be created.  If you want to configure the widgets that are created, you will in addition need to add a custom config.  This must be done under the custom property.  

```yaml
custom:
  serverless-cloudwatch-dashboard:
    dynamodb:
      metrics:
        - ReturnedBytes
```

If you don't specify the metrics it will use default metrics for the resource.  The defaults is listed below.

# Supported resources
## Lambda
The functions that are created by serverless is fully supported.  The following metrics are supported:  
  * Invocations
  * Errors
  * Dead Letter Errors
  * Duration
  * Throttles
  * IteratorAge
  * ConcurrentExceptions
  * UnreservedConcurrentExceptions
  
Defaults:
  * Invocations
  * Errors
  * Duration
  
To view documentation on the metrics, please see the official AWS documentation here:  
https://docs.aws.amazon.com/lambda/latest/dg/monitoring-functions-metrics.html  
  
## DynamoDb
DynamoDb is fully supported.  The following metrics are supported:
  * ConditionalCheckFailedRequests
  * ConsumedReadCapacityUnits
  * ConsumedWriteCapacityUnits
  * ReadThrottleEvents
  * ReturnedBytes
  * ReturnedItemCount
  * ReturnedRecordsCount
  * SuccessfulRequestLatency
  * SystemErrors
  * TimeToLiveDeletedItemCount
  * ThrottledRequests
  * UserErrors
  * WriteThrottleEvent
  
Defaults:
  * ConsumedReadCapacityUnits
  * ConsumedWriteCapacityUnits
  
To view documentation on the metrics, please see the official AWS documentation here:   https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/dynamo-metricscollected.html  


# EC2
EC2 is fully supported.  Please note that not all metrics is available for all instances. Please consult official documentation on which metrics that are available for which instance.  These metrics are supported:  
  * CPUCreditUsage
  * CPUCreditBalance
  * CPUSurplusCreditBalance
  * CPUSurplusCreditsCharged
  * CPUUtilization
  * DiskReadOps
  * DiskWriteOps
  * DiskReadBytes
  * DiskWriteBytes
  * NetworkIn
  * NetworkOut
  * NetworkPacketsIn
  * NetworkPacketsOut
  * EBSReadOps
  * EBSWriteOps
  * EBSReadBytes
  * EBSWriteBytes
  * EBSIOBalance%
  * EBSByteBalance%  
  
Defaults:
  * CPUUtilization
  
To view documentation on the metrics, please see the official AWS documentation here:   https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ec2-metricscollected.html  
  
  
## S3
S3 is fully supported.  The following metrics are supported:  
  * BucketSizeBytes
  * NumberOfObjects
  * AllRequests
  * GetRequests
  * PutRequests
  * DeleteRequests
  * HeadRequests
  * PostRequests
  * SelectRequests
  * ListRequests
  * BytesDownloaded
  * BytesUploaded
  * 4xxErrors
  * 5xxErrors
  * FirstByteLatency
  * TotalRequestLatency
    
Defaults:
  * GetRequests
  * PutRequests
  
To view documentation on the metrics, please see the official AWS documentation here:   https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/s3-metricscollected.html
  
# Example
Example yaml file.
```yaml
service: test

frameworkVersion: ">=1.1.0"

custom:
  bucket: test 
  serverless-cloudwatch-dashboard:
    dynamodb:
      metrics:
        - ReturnedBytes
plugins:
  - serverless-cloudwatch-dashboard

provider:
  name: aws
  runtime: nodejs4.3
  stage: dev
  region: eu-west-1
  iamRoleStatements:
    - Effect: Allow
      Action:
        - s3:PutObject
      Resource: "arn:aws:s3:::${self:custom.bucket}/*"

functions:
  save:
    handler: handler.save
    environment:
      BUCKET: ${self:custom.bucket}
resources:
  Resources:
    ec2:
      Type: AWS::EC2::Instance
      Properties: 
        InstanceType: t2.micro
        ImageId: ami-7dbc4004
    testtable:
      Type: AWS::DynamoDB::Table
      Properties:
        AttributeDefinitions:
          - AttributeName: firstName
            AttributeType: S
        KeySchema:
          - AttributeName: firstName
            KeyType: HASH
        ProvisionedThroughput:
          ReadCapacityUnits: 1
          WriteCapacityUnits: 1
        TableName: test
    tests3:
      Type: AWS::S3::Bucket
      Properties: 
        BucketName: somebucket
```

# Current limitations
 * You must specify table name or bucket name when defining s3/dynamodb resources.
 * It is not possible to have different metrics for different resources of the same type.
 * A lot of resources is not supported.  
 * It's impossible to customize the layout of the dashboard.
Some of these issues may be resolved in the future.  

If you find a bug, please add it to the issues on github.    