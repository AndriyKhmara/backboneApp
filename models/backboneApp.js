var fs = require('fs');

module.exports = (function () {

	var dbFilePath = './data/data.json';
	
	var readData = function (path) {
        try {
            var result = fs.readFileSync(path, 'utf8');
            return JSON.parse(result);
        } catch (e) {
            console.log(e);
            return [];
        }
    };

	var writeDBData = function (data) {
        try {
            fs.writeFileSync(
                dbFilePath,
                JSON.stringify(data),
                { flag: 'w+' }
            );
            dataArr = readData(dbFilePath);
        } catch(e) {
            console.log(e);
            return false;
        }
        return true;
    };

    var prepData = function (data) {
    	var id = dataArr.length + 1;
    	var result = {
    		id 			: id,
    		firstname	: data.firstname,
    		lastname	: data.lastname,
    		street		: data.street,
    		number 		: data.number,
    		zip			: data.zip,
    		email		: data.email

    	}
    	return result;
    };
    
    var postData = function (data){
    	console.log(data);
    	var prData = prepData(data);
    	dataArr.push(prData);
    	writeDBData(dataArr);
    };

    var dataArr = readData(dbFilePath);

    return {
     	postData:postData
    }
})();