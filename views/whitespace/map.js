function(doc) {
        function map_array(arr,name) {
                var i;
                for (i = 0; i < arr.length; i++) {
                        var value = arr[i];
                        if (value instanceof Array) {
                                map_array(value,name);
                        } else if (value instanceof Object) {
                                map_object(value, name);
                        } else {
                                emit_as_string(value, name);
                        }
                }
        }
        function map_object(doc,name) {
                var key;
                var newname;
                for (key in doc) {
                        if (name===null) {
                                newname = key;
                        } else {
                                newname = name + "." + key;
                        }
                        var value = doc[key];
                        if (value instanceof Array) {
                                map_array(value,newname);
                        } else if (value instanceof Object) {
                                        map_object(value, newname);
                        } else {
                                        emit_as_string(value, newname);
                        }
                }
        }
        function analyzer(value) {
                var lc = value.toLowerCase();
                var arr = lc.split(/[\s,.!;?:-]/);
                return arr;
        }
        function emit_as_string(value,name) {
                try {
                     var arr = analyzer(value);
                     var i;
                     for (i=0;i<arr.length;i++) {
                        emit([name,arr[i]],[[i]]);
                     }
                } catch (err) {
                        emit([name,value],[[0]]);
                }
        }
        map_object(doc,null);
}