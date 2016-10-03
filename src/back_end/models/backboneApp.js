var fs = require('fs');
var logger = require('./../services/logger.js');

module.exports = (function () {

    var session = [];

    var readData = function (path) {
        try {
            var result = fs.readFileSync(path, 'utf8');
            return JSON.parse(result);
        } catch (e) {
            logger.logError("Can't read from file " + path);
            return [];
        }
    };

    var writeData = function (data, path) {
        try {
            fs.writeFileSync(
                path,
                JSON.stringify(data),
                { flag: 'w+' }
            );            
        } catch(e) {
            logger.logError('Failed saving data to file, data: ' +
                JSON.stringify(record));
            return false;
        }
        return true;
    };

    var booksPath = './data/books.json';
    var setingsPath = './data/settings.json';   
    var userDataPath = './data/users.json';

    var booksArr = readData(booksPath);
    var dataArr = readData(setingsPath);
    var users = readData(userDataPath);

    var getSettings = function (id) {
        var result = {};
        for (var i = 0; i < dataArr.length; i++) {
            if (dataArr[i].userID == id) {
                result = dataArr[i];
            }
        }
        return result;
    };
    
    
    var cabinet = function () {
        
    };
    
    var registration = function (data) {
        
        var id = users.length + 1;
        var recordData = {
            id: id,
            first_name:data.first_name,
            last_name:data.last_name,
            login:data.login,
            password:data.password,
            email:data.email
        };

        try {
            users.push(recordData);
            writeData(users, userDataPath);
            users = readData(userDataPath);
            return {
                succsess:true,
                message:'Registration successful !'
            };
        } catch(e) {
            return {
                succsess:false,
                message:'Registration unsuccessful !'
            };
        }
    };


    var generateToken = function () {
        var letter = "xcv,m39SFGDSFgxvj;lm32523j$@#%#$%SDGsVlakvjm,nv36";
        var token = '';
        for (var i = 0; i < 32; ++i) {
            token += letter[Math.floor(Math.random() * (letter.length)) + 1];
        }
        return token;
    };

    var login = function (data) {
        
        for(var i = 0; i < users.length; ++i) {
            var result = {};
            if (data.login == users[i].login && data.pw == users[i].password) {
                var token = generateToken();
                session.push({
                    userToken : token,
                    userName : users[i].login
                });
                result = {
                    success : true,
                    userToken : token,
                    id : users[i].id
                };

                return result;
            } else {
                result = {
                    success : false
                }
            }
        }
        return result;
    };

    var getData = function (data) {
        var result={};
        for (var i = 0; i < session.length; i++) {
          if (session[i].userToken == data.token) {
              result = getSettings(data.id);
          } else {
              result = {};
          }
        }
        return result;
    };

    var postData = function (data) {
        var dataArr2 = readData(setingsPath);

        for (var i = 0; i < session.length; i++) {
            if (session[i].userToken == data.token) {
                var preData = {
                    id: dataArr.length + 1,
                    userID: data.id,
                    fontFamily:data.fontFamily,
                    fontSize:data.fontSize,
                    color:data.color,
                    textAlign:data.textAlign
                };

                for (var j = 0; j < dataArr2.length; j++) {

                    if (dataArr2[j].userID == data.id) {

                        dataArr2[j].fontFamily = data.fontFamily;
                        dataArr2[j].fontSize = data.fontSize;
                        dataArr2[j].color = data.color;
                        dataArr2[j].textAlign = data.textAlign;
                        writeData(dataArr2, setingsPath);
                        dataArr = readData(setingsPath);
                        return {
                            success: true,
                            message: 'Data successfully changed'
                        };
                    }
                }
                dataArr2.push(preData);
                writeData(dataArr2, setingsPath);
                dataArr = readData(setingsPath);

                return {
                    success: true,
                    message: 'Data successfully added'
                };
            }
        }
        return {
            success: false,
            message: 'Data didn\'t added'
        };
    };

    var logout = function (data) {
        for (var i = 0; i < session.length; i++) {
            if (session[i].userToken == data.token) {
                session.splice(i, 1);
                return true;
            }
        }
        return false;
    };

    var prepareBook = function (book) {
        return {
            id      : booksArr.length + 1,
            book    : book
        }
    };
        
    var uploadBook = function (data) {

        var preBook = prepareBook(data);
        booksArr.push(preBook);
        writeData(booksArr, booksPath);
        booksArr = readData(booksPath);
    };


    return {
        getSettings:getSettings,
        cabinet:cabinet,
        registration:registration,
        login:login,
        getData:getData,
        postData:postData,
        logout:logout,
        uploadBook:uploadBook
}
})();