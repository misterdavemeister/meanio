/* finding sum of arguments
var sum = 0;
process.argv.filter(function(n) {
   return !n.match(/\D/) && n.match(/[0-9]/); 
}).forEach(function(num) {
    sum += Number(num);
});
console.log(sum);
 
their solution was :
    var result = 0  
     for (var i = 2; i < process.argv.length; i++)  
       result += Number(process.argv[i])  
     console.log(result)  
   
which is incredibly ineffective in solving this:
node program.js 1 2 3 4 5 "hi" false 
which equals 15. ;)
*/
/*
var fs = require('fs');
fs.readFile(process.argv[2], function(error, content) {
    getLines(content);
});

function getLines(f) {
    var lines = f.toString().split('\n').length - 1;
    console.log(lines);   
}
*/
/*
var fs = require('fs');
var dir = process.argv[2], ext = process.argv[3];

fs.readdir(dir, function(error, list) {
   list.forEach(function(li) {
       if (li.match(/\./) && li.split('.')[1] === ext) {
           console.log(li);
       }
   });
});
*/
/*
var module = require('./prog_module.js');

module(process.argv[2], process.argv[3], function (err, results) {
    if (err) return console.error("ERROR:", err);
    results.forEach(function(result) {
        console.log(result);  
    });
});
*//*
var http = require('http'), 
    url = process.argv[2]

http.get(url, function(res) {
    var data = "";
    res.setEncoding('utf8')
    res.on('data', function(d) {
       data += d; 
    });
    res.on('end', function() {
        console.log(data.length);
        console.log(data);
    });
    res.on('error', console.error)
})*/
/*
var http = require('http'),
    url1 = process.argv[2], 
    url2 = process.argv[3], 
    url3 = process.argv[4],
    urls_finished = 0, 
    data1 = '', data2 = '', data3 = '';

    http.get(url1, function(res) {
        res.setEncoding('utf8'); 
        res.on('data', function(d) {
           data1 += d;
        });
        res.on('end', function() {
            urls_finished++; 
            if (urls_finished == 3) {
                console.log(data1);
                console.log(data2);
                console.log(data3);
            }
        });
    });
    
    http.get(url2, function(res) {
        res.setEncoding('utf8'); 
        res.on('data', function(d) {
           data2 += d;
        });
        res.on('end', function() {
            urls_finished++; 
            if (urls_finished == 3) {
                console.log(data1);
                console.log(data2);
                console.log(data3);
            }
        });
    });
    
    http.get(url3, function(res) {
        res.setEncoding('utf8'); 
        res.on('data', function(d) {
           data3 += d;
        });
        res.on('end', function() {
            urls_finished++; 
            if (urls_finished == 3) {
                console.log(data1);
                console.log(data2);
                console.log(data3);
            }
        });
    });
*/
/*
var net = require('net');
var port = process.argv[2];
var server = net.createServer(function(socket) {
    socket.end(getDate() + "\n");
});
server.listen(port);

function zeroFill(n) {
    return (n < 10 ? "0" : "") + n;
}

function getDate() {
    var date = new Date();
    return date.getFullYear() + "-"
    + zeroFill(date.getMonth() + 1) + "-"
    + zeroFill(date.getDate()) + " "
    + zeroFill(date.getHours()) + ":"
    + zeroFill(date.getMinutes());
}*/
/*
var fs = require('fs'),
    http = require('http'),
    port = process.argv[2],
    file_location = process.argv[3];
    
http.createServer(function(req, res) {
   fs.createReadStream(file_location).pipe(res);
}).listen(Number(port));
*/
/*
var http = require('http'),
    stream = require('fs'),
    map = require('through2-map'),
    port = process.argv[2]

function map(callback) {
  console.log(arguments);
}
http.createServer(function(req, res) {
    if (req.method == 'POST') {
        req.pipe(map(function(chunk) {
            return chunk.toString().toUpperCase();
        })).pipe(res)
    }
}).listen(Number(port));
*/
var http = require('http'),
    url = require('url'),
    port = process.argv[2];
    
http.createServer(function(req, res) {
    var parsedUrl = url.parse(req.url, true);
    var time = new Date(parsedUrl.query.iso);
    var result = getTime(time, parsedUrl.pathname)
    if (result) {
	res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(result);
    }
    else {
        res.writeHead(404);
        res.end();
    }
}).listen(Number(port))

function getTime(time, path) {
    var json = {};
        if (path == '/api/parsetime') {
            json['hour'] = time.getHours();
            json['minute'] = time.getMinutes();
            json['second'] = time.getSeconds();
	 }
 	else if (path == '/api/unixtime') {
            json['unixtime'] = time.getTime();
        }
        return JSON.stringify(json);
}
