/**
 * Created by sumasoft on 3/25/15.
 */
var db = db.getSiblingDB('mean-dev');
main()

function main(){
    /*db.collection.find({your_query: "parameter"}).forEach(function(obj) {
        db.collection.update({ "_id" : obj._id}, {$set:{  title:"Tales",deadline:"XXXXX",description:"XXXXX",price:"XXXXX",creadBy:"XXXXX",creatdUserName:"XXXXX",...});

    });*/
    for (var i = 1; i <= 1000; i++) {
        db.projects.insert({
            "title" : "Project"+i ,
            "deadline": ISODate("2015-06-23T18:30:00.000Z"),
            "discription":"Testing"+i,
            "price":"10000",
            "createdBy" : "54fe8efbce11dd62044e6311",
            "createdUserName" : "arun sahni",
            "status" : "Open",
            "created" : ISODate("2015-03-20T07:22:11.931Z"
            )});
    }

}