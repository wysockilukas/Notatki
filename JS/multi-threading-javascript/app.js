// https://www.sitepoint.com/multi-threading-javascript/
// https://www.codingame.com/playgrounds/347/javascript-promises-mastering-the-asynchronous/what-is-asynchronous-in-javascript

function process() {
    var above = 0,
        below = 0;
    for (var i = 0; i < 200000; i++) {
        if (Math.random() * 2 > 1) {
            above++;
        } else {
            below++;
        }
    }
}

function test1() {
    var result1 = document.getElementById('result1');

    var start = new Date().getTime();

    for (var i = 0; i < 200; i++) {
        result1.value = 'time=' +
            (new Date().getTime() - start) + ' [i=' + i + ']';

        process();
    }

    result1.value = 'time=' +
        (new Date().getTime() - start) + ' [done]';
}





function test2() {
    var result2 = document.getElementById('result2');

    var start = new Date().getTime();

    var i = 0,
        limit = 200,
        busy = false;
    var processor = setInterval(function () {
        if (!busy) {
            busy = true;

            result2.value = 'time=' +
                (new Date().getTime() - start) + ' [i=' + i + ']';

            process();

            if (++i == limit) {
                clearInterval(processor);
                result2.value = 'time=' +
                    (new Date().getTime() - start) + ' [done]';
            }

            busy = false;
        }

    }, 1);

}







function test3() {

    var counter = 0,
        limit = 2000,
        busy = false;
    let q = 1n,
        r = 180n,
        t = 60n,
        i = 2n;

    var p = document.getElementById('pi');
    var digit = 0;

    var processor = setInterval(function () {
        if (!busy) {
            busy = true;


            let y = (q * (27n * i - 12n) + 5n * r) / (5n * t);
            let u = 3n * (3n * i + 1n) * (3n * i + 2n);
            r = 10n * u * (q * (5n * i - 2n) + r - y * t);
            q = 10n * q * i * (2n * i - 1n);
            t = t * u;
            i = i + 1n;
            // console.log(y.toString());
            p.appendChild(document.createTextNode(y.toString()))

            digit++;
            if (digit % 64 == 0) {
                p.appendChild(document.createElement('br'));
            }

            if (i === 3n) {
                // console.log('.'); 
                p.appendChild(document.createTextNode('.'))
            }


            if (++counter == limit) {
                clearInterval(processor);
            }

            busy = false;
        }

    }, 0);

}





function test4() {

    var counter = 0,
        limit = 2000,
        busy = false;
    let q = 1n,
        r = 180n,
        t = 60n,
        i = 2n;

    var p = document.getElementById('pi');
    var digit = 0;

    for (counter = 0;  counter < limit; counter++) {
        let y = (q * (27n * i - 12n) + 5n * r) / (5n * t);
        let u = 3n * (3n * i + 1n) * (3n * i + 2n);
        r = 10n * u * (q * (5n * i - 2n) + r - y * t);
        q = 10n * q * i * (2n * i - 1n);
        t = t * u;
        i = i + 1n;
        // console.log(y.toString());
        p.appendChild(document.createTextNode(y.toString()))

        digit++;
        if (digit % 64 == 0) {
            p.appendChild(document.createElement('br'));
        }

        if (i === 3n) {
            // console.log('.'); 
            p.appendChild(document.createTextNode('.'))
        }
    }

}


function test5() {

    var counter = 0,
        limit = 20000,
        busy = false;
    let q = 1n,
        r = 180n,
        t = 60n,
        i = 2n;

    var p = document.getElementById('pi');
    var digit = 0;

    for (counter = 0;  counter < limit; counter++) {

        setTimeout( ()=>{
            let y = (q * (27n * i - 12n) + 5n * r) / (5n * t);
            let u = 3n * (3n * i + 1n) * (3n * i + 2n);
            r = 10n * u * (q * (5n * i - 2n) + r - y * t);
            q = 10n * q * i * (2n * i - 1n);
            t = t * u;
            i = i + 1n;
            // console.log(y.toString());
            p.appendChild(document.createTextNode(y.toString()))
    
            digit++;
            if (digit % 64 == 0) {
                p.appendChild(document.createElement('br'));
            }
    
            if (i === 3n) {
                // console.log('.'); 
                p.appendChild(document.createTextNode('.'))
            }
        },0 )


    }

}













