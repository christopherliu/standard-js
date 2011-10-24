if(!Math.sum)
    Math.sum = function(ar)
    {
        var a = ar[0];
        for (var i = 1; i < ar.length; i++) {
            a = a + ar[i];
        }
        return a;
    };