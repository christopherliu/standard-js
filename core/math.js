if(!Math.sum)
    Math.sum = function(ar)
    {
        var a = 0;
        for (var i = 0; i < ar.length; i++) {
            a = a + ar[i];
        }
        return a;
    };