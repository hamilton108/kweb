(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.1/optimize for better performance and smaller assets.');


var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, $elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}



// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = $elm$core$Set$toList(x);
		y = $elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = $elm$core$Dict$toList(x);
		y = $elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (!x.$)
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? $elm$core$Basics$LT : n ? $elm$core$Basics$GT : $elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === $elm$core$Basics$EQ ? 0 : ord === $elm$core$Basics$LT ? -1 : 1;
	}));
});



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? $elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: $elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return $elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? $elm$core$Maybe$Nothing
		: $elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return $elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? $elm$core$Maybe$Just(n) : $elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800)
			+
			String.fromCharCode(code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



/**/
function _Json_errorToString(error)
{
	return $elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

var _Json_decodeInt = { $: 2 };
var _Json_decodeBool = { $: 3 };
var _Json_decodeFloat = { $: 4 };
var _Json_decodeValue = { $: 5 };
var _Json_decodeString = { $: 6 };

function _Json_decodeList(decoder) { return { $: 7, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 8, b: decoder }; }

function _Json_decodeNull(value) { return { $: 9, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 10,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 11,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 12,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 13,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 14,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 15,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 3:
			return (typeof value === 'boolean')
				? $elm$core$Result$Ok(value)
				: _Json_expecting('a BOOL', value);

		case 2:
			if (typeof value !== 'number') {
				return _Json_expecting('an INT', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return $elm$core$Result$Ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return $elm$core$Result$Ok(value);
			}

			return _Json_expecting('an INT', value);

		case 4:
			return (typeof value === 'number')
				? $elm$core$Result$Ok(value)
				: _Json_expecting('a FLOAT', value);

		case 6:
			return (typeof value === 'string')
				? $elm$core$Result$Ok(value)
				: (value instanceof String)
					? $elm$core$Result$Ok(value + '')
					: _Json_expecting('a STRING', value);

		case 9:
			return (value === null)
				? $elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 5:
			return $elm$core$Result$Ok(_Json_wrap(value));

		case 7:
			if (!Array.isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 8:
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 10:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, field, result.a));

		case 11:
			var index = decoder.e;
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return ($elm$core$Result$isOk(result)) ? result : $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, index, result.a));

		case 12:
			if (typeof value !== 'object' || value === null || Array.isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!$elm$core$Result$isOk(result))
					{
						return $elm$core$Result$Err(A2($elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return $elm$core$Result$Ok($elm$core$List$reverse(keyValuePairs));

		case 13:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!$elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return $elm$core$Result$Ok(answer);

		case 14:
			var result = _Json_runHelp(decoder.b, value);
			return (!$elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 15:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if ($elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return $elm$core$Result$Err($elm$json$Json$Decode$OneOf($elm$core$List$reverse(errors)));

		case 1:
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return $elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!$elm$core$Result$isOk(result))
		{
			return $elm$core$Result$Err(A2($elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return $elm$core$Result$Ok(toElmValue(array));
}

function _Json_toElmArray(array)
{
	return A2($elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return $elm$core$Result$Err(A2($elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 3:
		case 2:
		case 4:
		case 6:
		case 5:
			return true;

		case 9:
			return x.c === y.c;

		case 7:
		case 8:
		case 12:
			return _Json_equality(x.b, y.b);

		case 10:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 11:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 13:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 14:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 15:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	$elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		$elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS
//
// For some reason, tabs can appear in href protocols and it still works.
// So '\tjava\tSCRIPT:alert("!!!")' and 'javascript:alert("!!!")' are the same
// in practice. That is why _VirtualDom_RE_js and _VirtualDom_RE_js_html look
// so freaky.
//
// Pulling the regular expressions out to the top level gives a slight speed
// boost in small benchmarks (4-10%) but hoisting values to reduce allocation
// can be unpredictable in large programs where JIT may have a harder time with
// functions are not fully self-contained. The benefit is more that the js and
// js_html ones are so weird that I prefer to see them near each other.


var _VirtualDom_RE_script = /^script$/i;
var _VirtualDom_RE_on_formAction = /^(on|formAction$)/i;
var _VirtualDom_RE_js = /^\s*j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:/i;
var _VirtualDom_RE_js_html = /^\s*(j\s*a\s*v\s*a\s*s\s*c\s*r\s*i\s*p\s*t\s*:|d\s*a\s*t\s*a\s*:\s*t\s*e\s*x\s*t\s*\/\s*h\s*t\s*m\s*l\s*(,|;))/i;


function _VirtualDom_noScript(tag)
{
	return _VirtualDom_RE_script.test(tag) ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return _VirtualDom_RE_on_formAction.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return _VirtualDom_RE_js.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return _VirtualDom_RE_js_html.test(value)
		? /**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlJson(value)
{
	return (typeof _Json_unwrap(value) === 'string' && _VirtualDom_RE_js_html.test(_Json_unwrap(value)))
		? _Json_wrap(
			/**_UNUSED/''//*//**/'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'//*/
		) : value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2($elm$json$Json$Decode$map, func, handler.a)
				:
			A3($elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				$elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: $elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!$elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = $elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.download)
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = $elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? $elm$browser$Browser$Internal(next)
							: $elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return $elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return $elm$core$Result$isOk(result) ? $elm$core$Maybe$Just(result.a) : $elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail($elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2($elm$core$Task$perform, $elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



// SEND REQUEST

var _Http_toTask = F2(function(request, maybeProgress)
{
	return _Scheduler_binding(function(callback)
	{
		var xhr = new XMLHttpRequest();

		_Http_configureProgress(xhr, maybeProgress);

		xhr.addEventListener('error', function() {
			callback(_Scheduler_fail($elm$http$Http$NetworkError));
		});
		xhr.addEventListener('timeout', function() {
			callback(_Scheduler_fail($elm$http$Http$Timeout));
		});
		xhr.addEventListener('load', function() {
			callback(_Http_handleResponse(xhr, request.expect.a));
		});

		try
		{
			xhr.open(request.method, request.url, true);
		}
		catch (e)
		{
			return callback(_Scheduler_fail($elm$http$Http$BadUrl(request.url)));
		}

		_Http_configureRequest(xhr, request);

		var body = request.body;
		xhr.send($elm$http$Http$Internal$isStringBody(body)
			? (xhr.setRequestHeader('Content-Type', body.a), body.b)
			: body.a
		);

		return function() { xhr.abort(); };
	});
});

function _Http_configureProgress(xhr, maybeProgress)
{
	if (!$elm$core$Maybe$isJust(maybeProgress))
	{
		return;
	}

	xhr.addEventListener('progress', function(event) {
		if (!event.lengthComputable)
		{
			return;
		}
		_Scheduler_rawSpawn(maybeProgress.a({
			bytes: event.loaded,
			bytesExpected: event.total
		}));
	});
}

function _Http_configureRequest(xhr, request)
{
	for (var headers = request.headers; headers.b; headers = headers.b) // WHILE_CONS
	{
		xhr.setRequestHeader(headers.a.a, headers.a.b);
	}

	xhr.responseType = request.expect.b;
	xhr.withCredentials = request.withCredentials;

	$elm$core$Maybe$isJust(request.timeout) && (xhr.timeout = request.timeout.a);
}


// RESPONSES

function _Http_handleResponse(xhr, responseToResult)
{
	var response = _Http_toResponse(xhr);

	if (xhr.status < 200 || 300 <= xhr.status)
	{
		response.body = xhr.responseText;
		return _Scheduler_fail($elm$http$Http$BadStatus(response));
	}

	var result = responseToResult(response);

	if ($elm$core$Result$isOk(result))
	{
		return _Scheduler_succeed(result.a);
	}
	else
	{
		response.body = xhr.responseText;
		return _Scheduler_fail(A2($elm$http$Http$BadPayload, result.a, response));
	}
}

function _Http_toResponse(xhr)
{
	return {
		url: xhr.responseURL,
		status: { code: xhr.status, message: xhr.statusText },
		headers: _Http_parseHeaders(xhr.getAllResponseHeaders()),
		body: xhr.response
	};
}

function _Http_parseHeaders(rawHeaders)
{
	var headers = $elm$core$Dict$empty;

	if (!rawHeaders)
	{
		return headers;
	}

	var headerPairs = rawHeaders.split('\u000d\u000a');
	for (var i = headerPairs.length; i--; )
	{
		var headerPair = headerPairs[i];
		var index = headerPair.indexOf('\u003a\u0020');
		if (index > 0)
		{
			var key = headerPair.substring(0, index);
			var value = headerPair.substring(index + 2);

			headers = A3($elm$core$Dict$update, key, function(oldValue) {
				return $elm$core$Maybe$Just($elm$core$Maybe$isJust(oldValue)
					? value + ', ' + oldValue.a
					: value
				);
			}, headers);
		}
	}

	return headers;
}


// EXPECTORS

function _Http_expectStringResponse(responseToResult)
{
	return {
		$: 0,
		b: 'text',
		a: responseToResult
	};
}

var _Http_mapExpect = F2(function(func, expect)
{
	return {
		$: 0,
		b: expect.b,
		a: function(response) {
			var convertedResponse = expect.a(response);
			return A2($elm$core$Result$map, func, convertedResponse);
		}
	};
});


// BODY

function _Http_multipart(parts)
{


	for (var formData = new FormData(); parts.b; parts = parts.b) // WHILE_CONS
	{
		var part = parts.a;
		formData.append(part.a, part.b);
	}

	return $elm$http$Http$Internal$FormDataBody(formData);
}


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.multiline) { flags += 'm'; }
	if (options.caseInsensitive) { flags += 'i'; }

	try
	{
		return $elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return $elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		out.push(A4($elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? $elm$core$Maybe$Just(submatch)
				: $elm$core$Maybe$Nothing;
		}
		return replacer(A4($elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;
var $elm$core$List$cons = _List_cons;
var $elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var $elm$core$Array$foldr = F3(
	function (func, baseCase, _v0) {
		var tree = _v0.c;
		var tail = _v0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3($elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3($elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			$elm$core$Elm$JsArray$foldr,
			helper,
			A3($elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var $elm$core$Array$toList = function (array) {
	return A3($elm$core$Array$foldr, $elm$core$List$cons, _List_Nil, array);
};
var $elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3($elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var $elm$core$Dict$toList = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Dict$keys = function (dict) {
	return A3(
		$elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2($elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var $elm$core$Set$toList = function (_v0) {
	var dict = _v0.a;
	return $elm$core$Dict$keys(dict);
};
var $elm$core$Basics$EQ = {$: 'EQ'};
var $elm$core$Basics$GT = {$: 'GT'};
var $elm$core$Basics$LT = {$: 'LT'};
var $elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var $elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var $elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var $elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var $elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var $elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var $elm$core$Basics$False = {$: 'False'};
var $elm$core$Basics$add = _Basics_add;
var $elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var $elm$core$Maybe$Nothing = {$: 'Nothing'};
var $elm$core$String$all = _String_all;
var $elm$core$Basics$and = _Basics_and;
var $elm$core$Basics$append = _Utils_append;
var $elm$json$Json$Encode$encode = _Json_encode;
var $elm$core$String$fromInt = _String_fromNumber;
var $elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var $elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var $elm$json$Json$Decode$indent = function (str) {
	return A2(
		$elm$core$String$join,
		'\n    ',
		A2($elm$core$String$split, '\n', str));
};
var $elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var $elm$core$List$length = function (xs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var $elm$core$List$map2 = _List_map2;
var $elm$core$Basics$le = _Utils_le;
var $elm$core$Basics$sub = _Basics_sub;
var $elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2($elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var $elm$core$List$range = F2(
	function (lo, hi) {
		return A3($elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var $elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$map2,
			f,
			A2(
				$elm$core$List$range,
				0,
				$elm$core$List$length(xs) - 1),
			xs);
	});
var $elm$core$Char$toCode = _Char_toCode;
var $elm$core$Char$isLower = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var $elm$core$Char$isUpper = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var $elm$core$Basics$or = _Basics_or;
var $elm$core$Char$isAlpha = function (_char) {
	return $elm$core$Char$isLower(_char) || $elm$core$Char$isUpper(_char);
};
var $elm$core$Char$isDigit = function (_char) {
	var code = $elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var $elm$core$Char$isAlphaNum = function (_char) {
	return $elm$core$Char$isLower(_char) || ($elm$core$Char$isUpper(_char) || $elm$core$Char$isDigit(_char));
};
var $elm$core$List$reverse = function (list) {
	return A3($elm$core$List$foldl, $elm$core$List$cons, _List_Nil, list);
};
var $elm$core$String$uncons = _String_uncons;
var $elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + ($elm$core$String$fromInt(i + 1) + (') ' + $elm$json$Json$Decode$indent(
			$elm$json$Json$Decode$errorToString(error))));
	});
var $elm$json$Json$Decode$errorToString = function (error) {
	return A2($elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var $elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _v1 = $elm$core$String$uncons(f);
						if (_v1.$ === 'Nothing') {
							return false;
						} else {
							var _v2 = _v1.a;
							var _char = _v2.a;
							var rest = _v2.b;
							return $elm$core$Char$isAlpha(_char) && A2($elm$core$String$all, $elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + ($elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2($elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									$elm$core$String$join,
									'',
									$elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										$elm$core$String$join,
										'',
										$elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + ($elm$core$String$fromInt(
								$elm$core$List$length(errors)) + ' ways:'));
							return A2(
								$elm$core$String$join,
								'\n\n',
								A2(
									$elm$core$List$cons,
									introduction,
									A2($elm$core$List$indexedMap, $elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								$elm$core$String$join,
								'',
								$elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + ($elm$json$Json$Decode$indent(
						A2($elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var $elm$core$Array$branchFactor = 32;
var $elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var $elm$core$Elm$JsArray$empty = _JsArray_empty;
var $elm$core$Basics$ceiling = _Basics_ceiling;
var $elm$core$Basics$fdiv = _Basics_fdiv;
var $elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var $elm$core$Basics$toFloat = _Basics_toFloat;
var $elm$core$Array$shiftStep = $elm$core$Basics$ceiling(
	A2($elm$core$Basics$logBase, 2, $elm$core$Array$branchFactor));
var $elm$core$Array$empty = A4($elm$core$Array$Array_elm_builtin, 0, $elm$core$Array$shiftStep, $elm$core$Elm$JsArray$empty, $elm$core$Elm$JsArray$empty);
var $elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var $elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var $elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var $elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var $elm$core$Basics$eq = _Utils_equal;
var $elm$core$Basics$floor = _Basics_floor;
var $elm$core$Elm$JsArray$length = _JsArray_length;
var $elm$core$Basics$gt = _Utils_gt;
var $elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var $elm$core$Basics$mul = _Basics_mul;
var $elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var $elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var $elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _v0 = A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodes);
			var node = _v0.a;
			var remainingNodes = _v0.b;
			var newAcc = A2(
				$elm$core$List$cons,
				$elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return $elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var $elm$core$Tuple$first = function (_v0) {
	var x = _v0.a;
	return x;
};
var $elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = $elm$core$Basics$ceiling(nodeListSize / $elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2($elm$core$Elm$JsArray$initializeFromList, $elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2($elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var $elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail),
				$elm$core$Array$shiftStep,
				$elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * $elm$core$Array$branchFactor;
			var depth = $elm$core$Basics$floor(
				A2($elm$core$Basics$logBase, $elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? $elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2($elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				$elm$core$Array$Array_elm_builtin,
				$elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2($elm$core$Basics$max, 5, depth * $elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var $elm$core$Basics$idiv = _Basics_idiv;
var $elm$core$Basics$lt = _Utils_lt;
var $elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					$elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / $elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = $elm$core$Array$Leaf(
					A3($elm$core$Elm$JsArray$initialize, $elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - $elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2($elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var $elm$core$Basics$remainderBy = _Basics_remainderBy;
var $elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return $elm$core$Array$empty;
		} else {
			var tailLen = len % $elm$core$Array$branchFactor;
			var tail = A3($elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - $elm$core$Array$branchFactor;
			return A5($elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var $elm$core$Basics$True = {$: 'True'};
var $elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var $elm$json$Json$Decode$andThen = _Json_andThen;
var $elm$json$Json$Decode$map = _Json_map1;
var $elm$json$Json$Decode$map2 = _Json_map2;
var $elm$json$Json$Decode$succeed = _Json_succeed;
var $elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var $elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var $elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var $elm$core$Basics$identity = function (x) {
	return x;
};
var $elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var $elm$url$Url$Http = {$: 'Http'};
var $elm$url$Url$Https = {$: 'Https'};
var $elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var $elm$core$String$contains = _String_contains;
var $elm$core$String$length = _String_length;
var $elm$core$String$slice = _String_slice;
var $elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			$elm$core$String$slice,
			n,
			$elm$core$String$length(string),
			string);
	});
var $elm$core$String$indexes = _String_indexes;
var $elm$core$String$isEmpty = function (string) {
	return string === '';
};
var $elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3($elm$core$String$slice, 0, n, string);
	});
var $elm$core$String$toInt = _String_toInt;
var $elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if ($elm$core$String$isEmpty(str) || A2($elm$core$String$contains, '@', str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, ':', str);
			if (!_v0.b) {
				return $elm$core$Maybe$Just(
					A6($elm$url$Url$Url, protocol, str, $elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_v0.b.b) {
					var i = _v0.a;
					var _v1 = $elm$core$String$toInt(
						A2($elm$core$String$dropLeft, i + 1, str));
					if (_v1.$ === 'Nothing') {
						return $elm$core$Maybe$Nothing;
					} else {
						var port_ = _v1;
						return $elm$core$Maybe$Just(
							A6(
								$elm$url$Url$Url,
								protocol,
								A2($elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return $elm$core$Maybe$Nothing;
				}
			}
		}
	});
var $elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '/', str);
			if (!_v0.b) {
				return A5($elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _v0.a;
				return A5(
					$elm$url$Url$chompBeforePath,
					protocol,
					A2($elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '?', str);
			if (!_v0.b) {
				return A4($elm$url$Url$chompBeforeQuery, protocol, $elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _v0.a;
				return A4(
					$elm$url$Url$chompBeforeQuery,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if ($elm$core$String$isEmpty(str)) {
			return $elm$core$Maybe$Nothing;
		} else {
			var _v0 = A2($elm$core$String$indexes, '#', str);
			if (!_v0.b) {
				return A3($elm$url$Url$chompBeforeFragment, protocol, $elm$core$Maybe$Nothing, str);
			} else {
				var i = _v0.a;
				return A3(
					$elm$url$Url$chompBeforeFragment,
					protocol,
					$elm$core$Maybe$Just(
						A2($elm$core$String$dropLeft, i + 1, str)),
					A2($elm$core$String$left, i, str));
			}
		}
	});
var $elm$core$String$startsWith = _String_startsWith;
var $elm$url$Url$fromString = function (str) {
	return A2($elm$core$String$startsWith, 'http://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Http,
		A2($elm$core$String$dropLeft, 7, str)) : (A2($elm$core$String$startsWith, 'https://', str) ? A2(
		$elm$url$Url$chompAfterProtocol,
		$elm$url$Url$Https,
		A2($elm$core$String$dropLeft, 8, str)) : $elm$core$Maybe$Nothing);
};
var $elm$core$Basics$never = function (_v0) {
	never:
	while (true) {
		var nvr = _v0.a;
		var $temp$_v0 = nvr;
		_v0 = $temp$_v0;
		continue never;
	}
};
var $elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var $elm$core$Task$succeed = _Scheduler_succeed;
var $elm$core$Task$init = $elm$core$Task$succeed(_Utils_Tuple0);
var $elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							$elm$core$List$foldl,
							fn,
							acc,
							$elm$core$List$reverse(r4)) : A4($elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var $elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4($elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var $elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			$elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						$elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var $elm$core$Task$andThen = _Scheduler_andThen;
var $elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return $elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var $elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			$elm$core$Task$andThen,
			function (a) {
				return A2(
					$elm$core$Task$andThen,
					function (b) {
						return $elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var $elm$core$Task$sequence = function (tasks) {
	return A3(
		$elm$core$List$foldr,
		$elm$core$Task$map2($elm$core$List$cons),
		$elm$core$Task$succeed(_List_Nil),
		tasks);
};
var $elm$core$Platform$sendToApp = _Platform_sendToApp;
var $elm$core$Task$spawnCmd = F2(
	function (router, _v0) {
		var task = _v0.a;
		return _Scheduler_spawn(
			A2(
				$elm$core$Task$andThen,
				$elm$core$Platform$sendToApp(router),
				task));
	});
var $elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			$elm$core$Task$map,
			function (_v0) {
				return _Utils_Tuple0;
			},
			$elm$core$Task$sequence(
				A2(
					$elm$core$List$map,
					$elm$core$Task$spawnCmd(router),
					commands)));
	});
var $elm$core$Task$onSelfMsg = F3(
	function (_v0, _v1, _v2) {
		return $elm$core$Task$succeed(_Utils_Tuple0);
	});
var $elm$core$Task$cmdMap = F2(
	function (tagger, _v0) {
		var task = _v0.a;
		return $elm$core$Task$Perform(
			A2($elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager($elm$core$Task$init, $elm$core$Task$onEffects, $elm$core$Task$onSelfMsg, $elm$core$Task$cmdMap);
var $elm$core$Task$command = _Platform_leaf('Task');
var $elm$core$Task$perform = F2(
	function (toMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2($elm$core$Task$map, toMessage, task)));
	});
var $elm$browser$Browser$element = _Browser_element;
var $elm$json$Json$Decode$field = _Json_decodeField;
var $author$project$Ajourhold$Types$MainUrl = function (a) {
	return {$: 'MainUrl', a: a};
};
var $elm$json$Json$Decode$decodeValue = _Json_run;
var $elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var $elm$core$Dict$empty = $elm$core$Dict$RBEmpty_elm_builtin;
var $elm$core$Dict$Black = {$: 'Black'};
var $elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var $elm$core$Dict$Red = {$: 'Red'};
var $elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _v1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _v3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					key,
					value,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _v5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _v6 = left.d;
				var _v7 = _v6.a;
				var llK = _v6.b;
				var llV = _v6.c;
				var llLeft = _v6.d;
				var llRight = _v6.e;
				var lRight = left.e;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Red,
					lK,
					lV,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5($elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var $elm$core$Basics$compare = _Utils_compare;
var $elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, $elm$core$Dict$RBEmpty_elm_builtin, $elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _v1 = A2($elm$core$Basics$compare, key, nKey);
			switch (_v1.$) {
				case 'LT':
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3($elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5($elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3($elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var $elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _v0 = A3($elm$core$Dict$insertHelp, key, value, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$fromList = function (assocs) {
	return A3(
		$elm$core$List$foldl,
		F2(
			function (_v0, dict) {
				var key = _v0.a;
				var value = _v0.b;
				return A3($elm$core$Dict$insert, key, value, dict);
			}),
		$elm$core$Dict$empty,
		assocs);
};
var $elm$json$Json$Decode$keyValuePairs = _Json_decodeKeyValuePairs;
var $elm$json$Json$Decode$dict = function (decoder) {
	return A2(
		$elm$json$Json$Decode$map,
		$elm$core$Dict$fromList,
		$elm$json$Json$Decode$keyValuePairs(decoder));
};
var $author$project$Common$ModalDialog$DialogHidden = {$: 'DialogHidden'};
var $author$project$Ajourhold$Update$initModel = F3(
	function (mainUrl, ajcat, lang) {
		return {ajcat: ajcat, dateFrom: $elm$core$Maybe$Nothing, dateTo: $elm$core$Maybe$Nothing, dlgAlert: $author$project$Common$ModalDialog$DialogHidden, hourFrom: $elm$core$Maybe$Nothing, hourFrom2: $elm$core$Maybe$Nothing, hourTo: $elm$core$Maybe$Nothing, hourTo2: $elm$core$Maybe$Nothing, lang: lang, mainUrl: mainUrl, melding: $elm$core$Maybe$Nothing, reasonCodes: $elm$core$Maybe$Nothing, saldo: $elm$core$Maybe$Nothing, selectedReasonCode: $elm$core$Maybe$Nothing, selectedWatch: $elm$core$Maybe$Nothing, selectedWatch2: $elm$core$Maybe$Nothing, selectedWorkPlace: $elm$core$Maybe$Nothing, selectedWorkPlace2: $elm$core$Maybe$Nothing, sumHours: $elm$core$Maybe$Nothing, sumHours2: $elm$core$Maybe$Nothing, toTimeBank: $elm$core$Maybe$Nothing, userId: '-1', vacation: '0', watchDefs: $elm$core$Maybe$Nothing, watchDefs2: $elm$core$Maybe$Nothing, watches: $elm$core$Maybe$Nothing, watches2: $elm$core$Maybe$Nothing, workPlaces: $elm$core$Maybe$Nothing, workPlaces2: $elm$core$Maybe$Nothing};
	});
var $elm$core$Platform$Cmd$batch = _Platform_batch;
var $elm$core$Platform$Cmd$none = $elm$core$Platform$Cmd$batch(_List_Nil);
var $elm$json$Json$Decode$string = _Json_decodeString;
var $elm$core$Result$withDefault = F2(
	function (def, result) {
		if (result.$ === 'Ok') {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var $author$project$Ajourhold$Requests$init = function (flags) {
	var lang = A2(
		$elm$core$Result$withDefault,
		$elm$core$Dict$empty,
		A2(
			$elm$json$Json$Decode$decodeValue,
			$elm$json$Json$Decode$dict($elm$json$Json$Decode$string),
			flags.lang));
	return _Utils_Tuple2(
		A3(
			$author$project$Ajourhold$Update$initModel,
			$author$project$Ajourhold$Types$MainUrl(flags.mainurl),
			flags.ajcat,
			lang),
		$elm$core$Platform$Cmd$none);
};
var $elm$json$Json$Decode$int = _Json_decodeInt;
var $author$project$Ajourhold$Types$InitDataFetched = function (a) {
	return {$: 'InitDataFetched', a: a};
};
var $author$project$Ajourhold$Types$WorkPlacesFetched = function (a) {
	return {$: 'WorkPlacesFetched', a: a};
};
var $elm$core$Platform$Sub$batch = _Platform_batch;
var $elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var $elm$json$Json$Decode$value = _Json_decodeValue;
var $author$project$Ajourhold$Requests$initDataFetched = _Platform_incomingPort('initDataFetched', $elm$json$Json$Decode$value);
var $author$project$Ajourhold$Types$InitData = F5(
	function (userId, workPlaces, saldo, vacation, reasonCodes) {
		return {reasonCodes: reasonCodes, saldo: saldo, userId: userId, vacation: vacation, workPlaces: workPlaces};
	});
var $author$project$Common$ComboBox$ComboBoxItem = F2(
	function (val, txt) {
		return {txt: txt, val: val};
	});
var $author$project$Common$ComboBox$comboBoxItemDecoder = A3(
	$elm$json$Json$Decode$map2,
	$author$project$Common$ComboBox$ComboBoxItem,
	A2($elm$json$Json$Decode$field, 'value', $elm$json$Json$Decode$string),
	A2($elm$json$Json$Decode$field, 'text', $elm$json$Json$Decode$string));
var $elm$json$Json$Decode$list = _Json_decodeList;
var $author$project$Common$ComboBox$comboBoxItemListDecoder = $elm$json$Json$Decode$list($author$project$Common$ComboBox$comboBoxItemDecoder);
var $elm$json$Json$Decode$float = _Json_decodeFloat;
var $elm$json$Json$Decode$null = _Json_decodeNull;
var $elm$json$Json$Decode$oneOf = _Json_oneOf;
var $elm$json$Json$Decode$nullable = function (decoder) {
	return $elm$json$Json$Decode$oneOf(
		_List_fromArray(
			[
				$elm$json$Json$Decode$null($elm$core$Maybe$Nothing),
				A2($elm$json$Json$Decode$map, $elm$core$Maybe$Just, decoder)
			]));
};
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom = $elm$json$Json$Decode$map2($elm$core$Basics$apR);
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required = F3(
	function (key, valDecoder, decoder) {
		return A2(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A2($elm$json$Json$Decode$field, key, valDecoder),
			decoder);
	});
var $author$project$Ajourhold$Decoders$myInitDataDecoder = function () {
	var myDecoder = A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'reasonCodes',
		$elm$json$Json$Decode$nullable($author$project$Common$ComboBox$comboBoxItemListDecoder),
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'vacation',
			$elm$json$Json$Decode$string,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'saldo',
				$elm$json$Json$Decode$float,
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'workPlaces',
					$author$project$Common$ComboBox$comboBoxItemListDecoder,
					A3(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'userId',
						$elm$json$Json$Decode$string,
						$elm$json$Json$Decode$succeed($author$project$Ajourhold$Types$InitData))))));
	return $elm$json$Json$Decode$decodeValue(myDecoder);
}();
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$hardcoded = A2($elm$core$Basics$composeR, $elm$json$Json$Decode$succeed, $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom);
var $author$project$Ajourhold$Decoders$myWorkPlacesDecoder = function () {
	var myDecoder = A2(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$hardcoded,
		$elm$core$Maybe$Nothing,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'vacation',
			$elm$json$Json$Decode$string,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'saldo',
				$elm$json$Json$Decode$float,
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'workPlaces',
					$author$project$Common$ComboBox$comboBoxItemListDecoder,
					A3(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'userId',
						$elm$json$Json$Decode$string,
						$elm$json$Json$Decode$succeed($author$project$Ajourhold$Types$InitData))))));
	return $elm$json$Json$Decode$decodeValue(myDecoder);
}();
var $author$project$Ajourhold$Requests$workPlacesFetched = _Platform_incomingPort('workPlacesFetched', $elm$json$Json$Decode$value);
var $author$project$Ajourhold$Requests$subscriptions = function (_v0) {
	return $elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				$author$project$Ajourhold$Requests$initDataFetched(
				A2($elm$core$Basics$composeR, $author$project$Ajourhold$Decoders$myInitDataDecoder, $author$project$Ajourhold$Types$InitDataFetched)),
				$author$project$Ajourhold$Requests$workPlacesFetched(
				A2($elm$core$Basics$composeR, $author$project$Ajourhold$Decoders$myWorkPlacesDecoder, $author$project$Ajourhold$Types$WorkPlacesFetched))
			]));
};
var $author$project$Common$ModalDialog$DialogVisibleAlert = F3(
	function (a, b, c) {
		return {$: 'DialogVisibleAlert', a: a, b: b, c: c};
	});
var $author$project$Common$ModalDialog$Error = {$: 'Error'};
var $author$project$Common$ModalDialog$Info = {$: 'Info'};
var $elm$core$String$fromFloat = _String_fromNumber;
var $elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var $author$project$Common$DateTimeUtil$hs2Tup = function (hx) {
	if ((hx.b && hx.b.b) && (!hx.b.b.b)) {
		var h = hx.a;
		var _v1 = hx.b;
		var m = _v1.a;
		return _Utils_Tuple2(
			A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$String$toInt(h)),
			A2(
				$elm$core$Maybe$withDefault,
				0,
				$elm$core$String$toInt(m)));
	} else {
		return _Utils_Tuple2(0, 0);
	}
};
var $author$project$Common$DateTimeUtil$hourStrDiff = F2(
	function (hx1, hx2) {
		var _v0 = $author$project$Common$DateTimeUtil$hs2Tup(
			A2($elm$core$String$split, ':', hx2));
		var h2 = _v0.a;
		var m2 = _v0.b;
		var _v1 = $author$project$Common$DateTimeUtil$hs2Tup(
			A2($elm$core$String$split, ':', hx1));
		var h1 = _v1.a;
		var m1 = _v1.b;
		var h = h2 - h1;
		var hx = (h < 0) ? (h + 24) : h;
		var m = m2 - m1;
		return ((hx * 60) + m) / 60.0;
	});
var $elm$core$Basics$round = _Basics_round;
var $author$project$Common$Misc$toDecimal = F2(
	function (value, roundFactor) {
		var valx = $elm$core$Basics$round(value * roundFactor);
		return valx / roundFactor;
	});
var $author$project$Ajourhold$Update$calcSumHours = F2(
	function (hourFrom, hourTo) {
		if (_Utils_eq(hourFrom, $elm$core$Maybe$Nothing) || _Utils_eq(hourTo, $elm$core$Maybe$Nothing)) {
			return '0.0';
		} else {
			var h2 = A2($elm$core$Maybe$withDefault, '00:00', hourTo);
			var h1 = A2($elm$core$Maybe$withDefault, '00:00', hourFrom);
			return $elm$core$String$fromFloat(
				A2(
					$author$project$Common$Misc$toDecimal,
					A2($author$project$Common$DateTimeUtil$hourStrDiff, h1, h2),
					100.0));
		}
	});
var $author$project$Common$Misc$httpErr2str = function (err) {
	switch (err.$) {
		case 'Timeout':
			return 'Timeout';
		case 'NetworkError':
			return 'NetworkError';
		case 'BadUrl':
			var s = err.a;
			return 'BadUrl: ' + s;
		case 'BadStatus':
			return 'BadStatus: ';
		default:
			var s = err.a;
			return 'BadPayload: ' + s;
	}
};
var $author$project$Common$ModalDialog$errorAlert = F4(
	function (title, errMsg, httpErr, model) {
		var title_ = A2($elm$core$Maybe$withDefault, 'Error!', title);
		var errStr = _Utils_ap(
			errMsg,
			$author$project$Common$Misc$httpErr2str(httpErr));
		return _Utils_update(
			model,
			{
				dlgAlert: A3($author$project$Common$ModalDialog$DialogVisibleAlert, title_, errStr, $author$project$Common$ModalDialog$Error)
			});
	});
var $elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return $elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _v1 = A2($elm$core$Basics$compare, targetKey, key);
				switch (_v1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return $elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var $author$project$Common$Misc$getLangValue = F2(
	function (key, dict) {
		return A2(
			$elm$core$Maybe$withDefault,
			'empty',
			A2($elm$core$Dict$get, key, dict));
	});
var $author$project$Ajourhold$Update$maybeDate = function (s) {
	return (!$elm$core$String$length(s)) ? $elm$core$Maybe$Nothing : $elm$core$Maybe$Just(s);
};
var $author$project$Ajourhold$Update$resetModel = F2(
	function (model, dlgState) {
		var newModel = A3($author$project$Ajourhold$Update$initModel, model.mainUrl, model.ajcat, model.lang);
		return _Utils_update(
			newModel,
			{dlgAlert: dlgState, reasonCodes: model.reasonCodes, saldo: model.saldo, userId: model.userId, workPlaces: model.workPlaces, workPlaces2: model.workPlaces2});
	});
var $author$project$Ajourhold$Types$DataSentStatus = F2(
	function (ok, msg) {
		return {msg: msg, ok: ok};
	});
var $author$project$Ajourhold$Types$SendData = function (a) {
	return {$: 'SendData', a: a};
};
var $author$project$Ajourhold$Types$Sent = function (a) {
	return {$: 'Sent', a: a};
};
var $author$project$Ajourhold$Types$WatchDef = F6(
	function (len, hourFrom, hourTo, reason, isExtra, startDate) {
		return {hourFrom: hourFrom, hourTo: hourTo, isExtra: isExtra, len: len, reason: reason, startDate: startDate};
	});
var $author$project$Ajourhold$Types$defaultWatchDef = A6($author$project$Ajourhold$Types$WatchDef, '0.0', '00:00', '00:00', '-1', 'false', $elm$core$Maybe$Nothing);
var $author$project$Ajourhold$Commands$getWatchDef = F2(
	function (key, wdDict) {
		if (wdDict.$ === 'Nothing') {
			return $author$project$Ajourhold$Types$defaultWatchDef;
		} else {
			var wd = wdDict.a;
			var item = A2($elm$core$Dict$get, key, wd);
			if (item.$ === 'Nothing') {
				return $author$project$Ajourhold$Types$defaultWatchDef;
			} else {
				var found = item.a;
				return found;
			}
		}
	});
var $elm$core$Basics$negate = function (n) {
	return -n;
};
var $author$project$Common$DateTimeUtil$hourStrCompare = F2(
	function (hx1, hx2) {
		var _v0 = $author$project$Common$DateTimeUtil$hs2Tup(
			A2($elm$core$String$split, ':', hx2));
		var h2 = _v0.a;
		var m2 = _v0.b;
		var t2 = (h2 * 60) + m2;
		var _v1 = $author$project$Common$DateTimeUtil$hs2Tup(
			A2($elm$core$String$split, ':', hx1));
		var h1 = _v1.a;
		var m1 = _v1.b;
		var t1 = (h1 * 60) + m1;
		return (_Utils_cmp(t2, t1) > 0) ? 1 : ((_Utils_cmp(t1, t2) < 0) ? (-1) : 0);
	});
var $elm$core$Basics$neq = _Utils_notEqual;
var $elm$json$Json$Encode$null = _Json_encodeNull;
var $elm$json$Json$Encode$string = _Json_wrap;
var $author$project$Ajourhold$Commands$toJsonString = function (s) {
	if (s.$ === 'Nothing') {
		return $elm$json$Json$Encode$null;
	} else {
		var sx = s.a;
		return $elm$json$Json$Encode$string(sx);
	}
};
var $author$project$Ajourhold$Commands$ajCatDateFrom = function (model) {
	if (model.ajcat === 2) {
		var _v0 = model.selectedWatch;
		if (_v0.$ === 'Just') {
			var selWatch = _v0.a;
			var wd = A2($author$project$Ajourhold$Commands$getWatchDef, selWatch, model.watchDefs);
			if (!_Utils_eq(wd.startDate, model.dateFrom)) {
				var mhf = A2($elm$core$Maybe$withDefault, '00:00', model.hourFrom);
				var cmp = A2($author$project$Common$DateTimeUtil$hourStrCompare, wd.hourFrom, mhf);
				return (cmp === 1) ? $author$project$Ajourhold$Commands$toJsonString(wd.startDate) : $author$project$Ajourhold$Commands$toJsonString(model.dateFrom);
			} else {
				return $author$project$Ajourhold$Commands$toJsonString(wd.startDate);
			}
		} else {
			return $elm$json$Json$Encode$null;
		}
	} else {
		return $author$project$Ajourhold$Commands$toJsonString(model.dateFrom);
	}
};
var $elm$json$Json$Encode$object = function (pairs) {
	return _Json_wrap(
		A3(
			$elm$core$List$foldl,
			F2(
				function (_v0, obj) {
					var k = _v0.a;
					var v = _v0.b;
					return A3(_Json_addField, k, v, obj);
				}),
			_Json_emptyObject(_Utils_Tuple0),
			pairs));
};
var $elm$http$Http$Internal$StringBody = F2(
	function (a, b) {
		return {$: 'StringBody', a: a, b: b};
	});
var $elm$http$Http$stringBody = $elm$http$Http$Internal$StringBody;
var $author$project$Common$Misc$asHttpBody = function (lx) {
	var x = $elm$json$Json$Encode$object(lx);
	return A2(
		$elm$http$Http$stringBody,
		'application/json',
		A2($elm$json$Json$Encode$encode, 0, x));
};
var $elm$json$Json$Decode$bool = _Json_decodeBool;
var $elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var $author$project$Ajourhold$Commands$ajCatDict = $elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2(1, 8),
			_Utils_Tuple2(2, 2),
			_Utils_Tuple2(3, 512),
			_Utils_Tuple2(6, 4),
			_Utils_Tuple2(7, 1),
			_Utils_Tuple2(15, 1024),
			_Utils_Tuple2(18, 256),
			_Utils_Tuple2(19, 2048)
		]));
var $author$project$Ajourhold$Commands$fromAjCat = function (k) {
	return A2(
		$elm$core$Maybe$withDefault,
		-1,
		A2($elm$core$Dict$get, k, $author$project$Ajourhold$Commands$ajCatDict));
};
var $elm$json$Json$Encode$int = _Json_wrap;
var $author$project$Ajourhold$Commands$isExtra = function (model) {
	var _v0 = model.selectedWatch;
	if (_v0.$ === 'Nothing') {
		return $elm$core$Maybe$Nothing;
	} else {
		var w = _v0.a;
		var curWd = A2($author$project$Ajourhold$Commands$getWatchDef, w, model.watchDefs);
		return $elm$core$Maybe$Just(curWd.isExtra);
	}
};
var $elm$json$Json$Decode$decodeString = _Json_runOnString;
var $elm$http$Http$BadPayload = F2(
	function (a, b) {
		return {$: 'BadPayload', a: a, b: b};
	});
var $elm$http$Http$BadStatus = function (a) {
	return {$: 'BadStatus', a: a};
};
var $elm$http$Http$BadUrl = function (a) {
	return {$: 'BadUrl', a: a};
};
var $elm$http$Http$Internal$FormDataBody = function (a) {
	return {$: 'FormDataBody', a: a};
};
var $elm$http$Http$NetworkError = {$: 'NetworkError'};
var $elm$http$Http$Timeout = {$: 'Timeout'};
var $elm$core$Maybe$isJust = function (maybe) {
	if (maybe.$ === 'Just') {
		return true;
	} else {
		return false;
	}
};
var $elm$http$Http$Internal$isStringBody = function (body) {
	if (body.$ === 'StringBody') {
		return true;
	} else {
		return false;
	}
};
var $elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return $elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return $elm$core$Result$Err(e);
		}
	});
var $elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var $elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var lLeft = _v1.d;
			var lRight = _v1.e;
			var _v2 = dict.e;
			var rClr = _v2.a;
			var rK = _v2.b;
			var rV = _v2.c;
			var rLeft = _v2.d;
			var _v3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _v2.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v4 = dict.d;
			var lClr = _v4.a;
			var lK = _v4.b;
			var lV = _v4.c;
			var lLeft = _v4.d;
			var lRight = _v4.e;
			var _v5 = dict.e;
			var rClr = _v5.a;
			var rK = _v5.b;
			var rV = _v5.c;
			var rLeft = _v5.d;
			var rRight = _v5.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v1 = dict.d;
			var lClr = _v1.a;
			var lK = _v1.b;
			var lV = _v1.c;
			var _v2 = _v1.d;
			var _v3 = _v2.a;
			var llK = _v2.b;
			var llV = _v2.c;
			var llLeft = _v2.d;
			var llRight = _v2.e;
			var lRight = _v1.e;
			var _v4 = dict.e;
			var rClr = _v4.a;
			var rK = _v4.b;
			var rV = _v4.c;
			var rLeft = _v4.d;
			var rRight = _v4.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				$elm$core$Dict$Red,
				lK,
				lV,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _v5 = dict.d;
			var lClr = _v5.a;
			var lK = _v5.b;
			var lV = _v5.c;
			var lLeft = _v5.d;
			var lRight = _v5.e;
			var _v6 = dict.e;
			var rClr = _v6.a;
			var rK = _v6.b;
			var rV = _v6.c;
			var rLeft = _v6.d;
			var rRight = _v6.e;
			if (clr.$ === 'Black') {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					$elm$core$Dict$Black,
					k,
					v,
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var $elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _v1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_v2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _v3 = right.a;
							var _v4 = right.d;
							var _v5 = _v4.a;
							return $elm$core$Dict$moveRedRight(dict);
						} else {
							break _v2$2;
						}
					} else {
						var _v6 = right.a;
						var _v7 = right.d;
						return $elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _v2$2;
				}
			}
			return dict;
		}
	});
var $elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _v3 = lLeft.a;
				return A5(
					$elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					$elm$core$Dict$removeMin(left),
					right);
			} else {
				var _v4 = $elm$core$Dict$moveRedLeft(dict);
				if (_v4.$ === 'RBNode_elm_builtin') {
					var nColor = _v4.a;
					var nKey = _v4.b;
					var nValue = _v4.c;
					var nLeft = _v4.d;
					var nRight = _v4.e;
					return A5(
						$elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						$elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				$elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				$elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return $elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var $elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _v4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _v6 = lLeft.a;
						return A5(
							$elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2($elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _v7 = $elm$core$Dict$moveRedLeft(dict);
						if (_v7.$ === 'RBNode_elm_builtin') {
							var nColor = _v7.a;
							var nKey = _v7.b;
							var nValue = _v7.c;
							var nLeft = _v7.d;
							var nRight = _v7.e;
							return A5(
								$elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2($elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return $elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						$elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2($elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					$elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7($elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var $elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _v1 = $elm$core$Dict$getMin(right);
				if (_v1.$ === 'RBNode_elm_builtin') {
					var minKey = _v1.b;
					var minValue = _v1.c;
					return A5(
						$elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						$elm$core$Dict$removeMin(right));
				} else {
					return $elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					$elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2($elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return $elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var $elm$core$Dict$remove = F2(
	function (key, dict) {
		var _v0 = A2($elm$core$Dict$removeHelp, key, dict);
		if ((_v0.$ === 'RBNode_elm_builtin') && (_v0.a.$ === 'Red')) {
			var _v1 = _v0.a;
			var k = _v0.b;
			var v = _v0.c;
			var l = _v0.d;
			var r = _v0.e;
			return A5($elm$core$Dict$RBNode_elm_builtin, $elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _v0;
			return x;
		}
	});
var $elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _v0 = alter(
			A2($elm$core$Dict$get, targetKey, dictionary));
		if (_v0.$ === 'Just') {
			var value = _v0.a;
			return A3($elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2($elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var $elm$http$Http$expectStringResponse = _Http_expectStringResponse;
var $elm$http$Http$expectJson = function (decoder) {
	return $elm$http$Http$expectStringResponse(
		function (response) {
			var _v0 = A2($elm$json$Json$Decode$decodeString, decoder, response.body);
			if (_v0.$ === 'Err') {
				var decodeError = _v0.a;
				return $elm$core$Result$Err(
					$elm$json$Json$Decode$errorToString(decodeError));
			} else {
				var value = _v0.a;
				return $elm$core$Result$Ok(value);
			}
		});
};
var $elm$http$Http$Internal$Request = function (a) {
	return {$: 'Request', a: a};
};
var $elm$http$Http$request = $elm$http$Http$Internal$Request;
var $elm$http$Http$post = F3(
	function (url, body, decoder) {
		return $elm$http$Http$request(
			{
				body: body,
				expect: $elm$http$Http$expectJson(decoder),
				headers: _List_Nil,
				method: 'POST',
				timeout: $elm$core$Maybe$Nothing,
				url: url,
				withCredentials: false
			});
	});
var $elm$core$Task$onError = _Scheduler_onError;
var $elm$core$Task$attempt = F2(
	function (resultToMessage, task) {
		return $elm$core$Task$command(
			$elm$core$Task$Perform(
				A2(
					$elm$core$Task$onError,
					A2(
						$elm$core$Basics$composeL,
						A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
						$elm$core$Result$Err),
					A2(
						$elm$core$Task$andThen,
						A2(
							$elm$core$Basics$composeL,
							A2($elm$core$Basics$composeL, $elm$core$Task$succeed, resultToMessage),
							$elm$core$Result$Ok),
						task))));
	});
var $elm$http$Http$toTask = function (_v0) {
	var request_ = _v0.a;
	return A2(_Http_toTask, request_, $elm$core$Maybe$Nothing);
};
var $elm$http$Http$send = F2(
	function (resultToMessage, request_) {
		return A2(
			$elm$core$Task$attempt,
			resultToMessage,
			$elm$http$Http$toTask(request_));
	});
var $elm$json$Json$Encode$float = _Json_wrap;
var $elm$core$String$toFloat = _String_toFloat;
var $author$project$Ajourhold$Commands$toJsonFloat = function (s) {
	if (s.$ === 'Nothing') {
		return $elm$json$Json$Encode$null;
	} else {
		var sx = s.a;
		var si = $elm$core$String$toFloat(sx);
		if (si.$ === 'Just') {
			var six = si.a;
			return $elm$json$Json$Encode$float(six);
		} else {
			return $elm$json$Json$Encode$null;
		}
	}
};
var $author$project$Ajourhold$Commands$toJsonInt = function (s) {
	if (s.$ === 'Nothing') {
		return $elm$json$Json$Encode$null;
	} else {
		var sx = s.a;
		var si = $elm$core$String$toInt(sx);
		if (si.$ === 'Just') {
			var six = si.a;
			return $elm$json$Json$Encode$int(six);
		} else {
			return $elm$json$Json$Encode$null;
		}
	}
};
var $author$project$Ajourhold$Commands$sendData = function (model) {
	var myDecoder = A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'msg',
		$elm$json$Json$Decode$string,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'ok',
			$elm$json$Json$Decode$bool,
			$elm$json$Json$Decode$succeed($author$project$Ajourhold$Types$DataSentStatus)));
	var myDateTo = model.dateTo;
	var ajCat = model.ajcat;
	var myHourFrom = function () {
		if (ajCat === 3) {
			return $elm$core$Maybe$Nothing;
		} else {
			return model.hourFrom;
		}
	}();
	var myHourTo = function () {
		if (ajCat === 3) {
			return $elm$core$Maybe$Nothing;
		} else {
			return model.hourTo;
		}
	}();
	var stem = _List_fromArray(
		[
			_Utils_Tuple2(
			'userId',
			$elm$json$Json$Encode$string(model.userId)),
			_Utils_Tuple2(
			'msgType',
			$elm$json$Json$Encode$int(
				$author$project$Ajourhold$Commands$fromAjCat(model.ajcat))),
			_Utils_Tuple2(
			'workPlace',
			$author$project$Ajourhold$Commands$toJsonInt(model.selectedWorkPlace)),
			_Utils_Tuple2(
			'dateFrom',
			$author$project$Ajourhold$Commands$ajCatDateFrom(model)),
			_Utils_Tuple2(
			'dateTo',
			$author$project$Ajourhold$Commands$toJsonString(myDateTo)),
			_Utils_Tuple2(
			'hourFrom',
			$author$project$Ajourhold$Commands$toJsonString(myHourFrom)),
			_Utils_Tuple2(
			'hourTo',
			$author$project$Ajourhold$Commands$toJsonString(myHourTo)),
			_Utils_Tuple2('ajourId', $elm$json$Json$Encode$null),
			_Utils_Tuple2(
			'reason',
			$author$project$Ajourhold$Commands$toJsonInt(model.selectedReasonCode)),
			_Utils_Tuple2(
			'timeBank',
			$author$project$Ajourhold$Commands$toJsonFloat(model.toTimeBank)),
			_Utils_Tuple2(
			'msg',
			$author$project$Ajourhold$Commands$toJsonString(model.melding)),
			_Utils_Tuple2(
			'isExtra',
			$author$project$Ajourhold$Commands$toJsonString(
				$author$project$Ajourhold$Commands$isExtra(model)))
		]);
	var params = function () {
		switch (ajCat) {
			case 3:
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(
						'turnuslinjeId',
						$author$project$Ajourhold$Commands$toJsonInt(model.selectedWatch)),
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							'turnuslinjeId2',
							$author$project$Ajourhold$Commands$toJsonInt(model.selectedWatch2)),
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2('ajourDvId', $elm$json$Json$Encode$null),
							stem)));
			case 7:
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(
						'ajourDvId',
						$author$project$Ajourhold$Commands$toJsonInt(model.selectedWatch)),
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2('turnuslinjeId', $elm$json$Json$Encode$null),
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2('turnuslinjeId2', $elm$json$Json$Encode$null),
							stem)));
			case 15:
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(
						'turnuslinjeId',
						$author$project$Ajourhold$Commands$toJsonInt(model.selectedWatch)),
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2(
							'turnuslinjeId2',
							$author$project$Ajourhold$Commands$toJsonInt(model.selectedWatch2)),
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2('ajourDvId', $elm$json$Json$Encode$null),
							A2(
								$elm$core$List$cons,
								_Utils_Tuple2(
									'hourFrom2',
									$author$project$Ajourhold$Commands$toJsonString(model.hourFrom2)),
								A2(
									$elm$core$List$cons,
									_Utils_Tuple2(
										'hourTo2',
										$author$project$Ajourhold$Commands$toJsonString(model.hourTo2)),
									stem)))));
			default:
				return A2(
					$elm$core$List$cons,
					_Utils_Tuple2(
						'turnuslinjeId',
						$author$project$Ajourhold$Commands$toJsonInt(model.selectedWatch)),
					A2(
						$elm$core$List$cons,
						_Utils_Tuple2('turnuslinjeId2', $elm$json$Json$Encode$null),
						A2(
							$elm$core$List$cons,
							_Utils_Tuple2('ajourDvId', $elm$json$Json$Encode$null),
							stem)));
		}
	}();
	var jbody = $author$project$Common$Misc$asHttpBody(params);
	var _v0 = model.mainUrl;
	var mainUrl = _v0.a;
	var url = mainUrl + '/SaveMessageCenter';
	return A2(
		$elm$http$Http$send,
		A2($elm$core$Basics$composeL, $author$project$Ajourhold$Types$SendData, $author$project$Ajourhold$Types$Sent),
		A3($elm$http$Http$post, url, jbody, myDecoder));
};
var $author$project$Ajourhold$Types$UserId = function (a) {
	return {$: 'UserId', a: a};
};
var $author$project$Ajourhold$Types$CoverFor = {$: 'CoverFor'};
var $author$project$Ajourhold$Types$Fetched = function (a) {
	return {$: 'Fetched', a: a};
};
var $author$project$Ajourhold$Types$WatchMsgFor = F2(
	function (a, b) {
		return {$: 'WatchMsgFor', a: a, b: b};
	});
var $elm$http$Http$Internal$EmptyBody = {$: 'EmptyBody'};
var $elm$http$Http$emptyBody = $elm$http$Http$Internal$EmptyBody;
var $elm$http$Http$get = F2(
	function (url, decoder) {
		return $elm$http$Http$request(
			{
				body: $elm$http$Http$emptyBody,
				expect: $elm$http$Http$expectJson(decoder),
				headers: _List_Nil,
				method: 'GET',
				timeout: $elm$core$Maybe$Nothing,
				url: url,
				withCredentials: false
			});
	});
var $author$project$Ajourhold$Types$WatchInfo = F2(
	function (watches, watchDefs) {
		return {watchDefs: watchDefs, watches: watches};
	});
var $elm$json$Json$Decode$fail = _Json_fail;
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder = F3(
	function (pathDecoder, valDecoder, fallback) {
		var nullOr = function (decoder) {
			return $elm$json$Json$Decode$oneOf(
				_List_fromArray(
					[
						decoder,
						$elm$json$Json$Decode$null(fallback)
					]));
		};
		var handleResult = function (input) {
			var _v0 = A2($elm$json$Json$Decode$decodeValue, pathDecoder, input);
			if (_v0.$ === 'Ok') {
				var rawValue = _v0.a;
				var _v1 = A2(
					$elm$json$Json$Decode$decodeValue,
					nullOr(valDecoder),
					rawValue);
				if (_v1.$ === 'Ok') {
					var finalResult = _v1.a;
					return $elm$json$Json$Decode$succeed(finalResult);
				} else {
					var finalErr = _v1.a;
					return $elm$json$Json$Decode$fail(
						$elm$json$Json$Decode$errorToString(finalErr));
				}
			} else {
				return $elm$json$Json$Decode$succeed(fallback);
			}
		};
		return A2($elm$json$Json$Decode$andThen, handleResult, $elm$json$Json$Decode$value);
	});
var $NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional = F4(
	function (key, valDecoder, fallback, decoder) {
		return A2(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$custom,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optionalDecoder,
				A2($elm$json$Json$Decode$field, key, $elm$json$Json$Decode$value),
				valDecoder,
				fallback),
			decoder);
	});
var $author$project$Ajourhold$Decoders$watchDefDecoder = A4(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$optional,
	'startDate',
	$elm$json$Json$Decode$nullable($elm$json$Json$Decode$string),
	$elm$core$Maybe$Nothing,
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'isExtra',
		$elm$json$Json$Decode$string,
		A3(
			$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
			'reason',
			$elm$json$Json$Decode$string,
			A3(
				$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
				'hourTo',
				$elm$json$Json$Decode$string,
				A3(
					$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
					'hourFrom',
					$elm$json$Json$Decode$string,
					A3(
						$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
						'len',
						$elm$json$Json$Decode$string,
						$elm$json$Json$Decode$succeed($author$project$Ajourhold$Types$WatchDef)))))));
var $author$project$Ajourhold$Decoders$watchInfoDecoder = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'watchdefs',
	$elm$json$Json$Decode$nullable(
		$elm$json$Json$Decode$dict($author$project$Ajourhold$Decoders$watchDefDecoder)),
	A3(
		$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
		'watches',
		$elm$json$Json$Decode$nullable($author$project$Common$ComboBox$comboBoxItemListDecoder),
		$elm$json$Json$Decode$succeed($author$project$Ajourhold$Types$WatchInfo)));
var $author$project$Ajourhold$Commands$fetchWatches_ = F8(
	function (_v0, ajCat, ajaxCall, myCmd, userId, workPlace, dateFrom, dateTo) {
		var mainUrl = _v0.a;
		if (_Utils_eq(workPlace, $elm$core$Maybe$Nothing) || _Utils_eq(dateFrom, $elm$core$Maybe$Nothing)) {
			return $elm$core$Platform$Cmd$none;
		} else {
			if (A2($elm$core$Maybe$withDefault, '-1', workPlace) === '-1') {
				return $elm$core$Platform$Cmd$none;
			} else {
				var wp = A2($elm$core$Maybe$withDefault, '-', workPlace);
				var df = A2($elm$core$Maybe$withDefault, '-', dateFrom);
				var dt = A2($elm$core$Maybe$withDefault, df, dateTo);
				var url = function () {
					if (ajCat.$ === 'Nothing') {
						return mainUrl + (ajaxCall + ('?workPlace=' + (wp + ('&userid=' + (userId + ('&dateFrom=' + (df + ('&dateTo=' + dt))))))));
					} else {
						var ajCat_ = ajCat.a;
						return mainUrl + (ajaxCall + ('?messageType=' + ($elm$core$String$fromInt(
							$author$project$Ajourhold$Commands$fromAjCat(ajCat_)) + ('&workPlace=' + (wp + ('&userid=' + (userId + ('&dateFrom=' + (df + ('&dateTo=' + dt))))))))));
					}
				}();
				return A2(
					$elm$http$Http$send,
					myCmd,
					A2($elm$http$Http$get, url, $author$project$Ajourhold$Decoders$watchInfoDecoder));
			}
		}
	});
var $author$project$Ajourhold$Commands$fetchCoverFor = F5(
	function (mu, userId, workPlace, dateFrom, dateTo) {
		return A8(
			$author$project$Ajourhold$Commands$fetchWatches_,
			mu,
			$elm$core$Maybe$Nothing,
			'/CoverFor',
			A2(
				$elm$core$Basics$composeL,
				$author$project$Ajourhold$Types$WatchMsgFor($author$project$Ajourhold$Types$CoverFor),
				$author$project$Ajourhold$Types$Fetched),
			userId,
			workPlace,
			dateFrom,
			dateTo);
	});
var $author$project$Ajourhold$Types$NoWorkPlace = {$: 'NoWorkPlace'};
var $author$project$Ajourhold$Types$TimebankFetched = function (a) {
	return {$: 'TimebankFetched', a: a};
};
var $author$project$Ajourhold$Types$Watch1 = {$: 'Watch1'};
var $author$project$Ajourhold$Types$fromWorkPlace = function (wp) {
	if (wp.$ === 'NoWorkPlace') {
		return '-1';
	} else {
		var s = wp.a;
		return s;
	}
};
var $author$project$Ajourhold$Types$TimebankWorkPlace = function (value) {
	return {value: value};
};
var $author$project$Ajourhold$Decoders$timebankWorkPlaceDecoder = A3(
	$NoRedInk$elm_json_decode_pipeline$Json$Decode$Pipeline$required,
	'value',
	$elm$json$Json$Decode$float,
	$elm$json$Json$Decode$succeed($author$project$Ajourhold$Types$TimebankWorkPlace));
var $author$project$Ajourhold$Commands$fetchTimebankWorkPlace = F4(
	function (_v0, _v1, origWp, newWp) {
		var mainUrl = _v0.a;
		var userId = _v1.a;
		if (_Utils_eq(newWp, $author$project$Ajourhold$Types$NoWorkPlace) || _Utils_eq(origWp, newWp)) {
			return $elm$core$Platform$Cmd$none;
		} else {
			var url = mainUrl + ('/timebankworkplace/' + (userId + ('/' + $author$project$Ajourhold$Types$fromWorkPlace(newWp))));
			var myCmd = A2(
				$elm$core$Basics$composeL,
				$author$project$Ajourhold$Types$WatchMsgFor($author$project$Ajourhold$Types$Watch1),
				$author$project$Ajourhold$Types$TimebankFetched);
			return A2(
				$elm$http$Http$send,
				myCmd,
				A2($elm$http$Http$get, url, $author$project$Ajourhold$Decoders$timebankWorkPlaceDecoder));
		}
	});
var $elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {index: index, match: match, number: number, submatches: submatches};
	});
var $elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var $elm$regex$Regex$fromString = function (string) {
	return A2(
		$elm$regex$Regex$fromStringWith,
		{caseInsensitive: false, multiline: false},
		string);
};
var $elm$regex$Regex$never = _Regex_never;
var $author$project$Common$Misc$commaOrDot = A2(
	$elm$core$Maybe$withDefault,
	$elm$regex$Regex$never,
	$elm$regex$Regex$fromString('[,|.]'));
var $elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var $elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return $elm$core$Maybe$Just(x);
	} else {
		return $elm$core$Maybe$Nothing;
	}
};
var $elm$regex$Regex$split = _Regex_splitAtMost(_Regex_infinity);
var $author$project$Common$Misc$formatNumberStr = F2(
	function (str, numDecimals) {
		var splitList = A2($elm$regex$Regex$split, $author$project$Common$Misc$commaOrDot, str);
		var numPart = A2(
			$elm$core$Maybe$withDefault,
			'0',
			$elm$core$List$head(splitList));
		var decimalPart = A2(
			$elm$core$String$left,
			numDecimals,
			A2(
				$elm$core$Maybe$withDefault,
				'00',
				$elm$core$List$head(
					A2($elm$core$List$drop, 1, splitList))));
		return numPart + ('.' + decimalPart);
	});
var $author$project$Ajourhold$Types$WorkPlace = function (a) {
	return {$: 'WorkPlace', a: a};
};
var $author$project$Ajourhold$Types$toWorkPlace = function (s) {
	if (s.$ === 'Nothing') {
		return $author$project$Ajourhold$Types$NoWorkPlace;
	} else {
		var sx = s.a;
		return (sx === '-1') ? $author$project$Ajourhold$Types$NoWorkPlace : $author$project$Ajourhold$Types$WorkPlace(sx);
	}
};
var $author$project$Ajourhold$Update$updateCoverFor = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'Changed':
				var s = msg.a;
				var w = A2($author$project$Ajourhold$Commands$getWatchDef, s, model.watchDefs);
				var sumStr = A2($author$project$Common$Misc$formatNumberStr, w.len, 2);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							hourFrom: $elm$core$Maybe$Just(w.hourFrom),
							hourTo: $elm$core$Maybe$Just(w.hourTo),
							selectedReasonCode: $elm$core$Maybe$Just(w.reason),
							selectedWatch: $elm$core$Maybe$Just(s),
							sumHours: $elm$core$Maybe$Just(sumStr)
						}),
					$elm$core$Platform$Cmd$none);
			case 'DateChanged':
				var s = msg.b;
				var myDateFrom = $author$project$Ajourhold$Update$maybeDate(s);
				var curCmd = A5($author$project$Ajourhold$Commands$fetchCoverFor, model.mainUrl, model.userId, model.selectedWorkPlace, myDateFrom, model.dateTo);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{dateFrom: myDateFrom, hourFrom: $elm$core$Maybe$Nothing, hourTo: $elm$core$Maybe$Nothing, selectedReasonCode: $elm$core$Maybe$Nothing, selectedWatch: $elm$core$Maybe$Nothing}),
					curCmd);
			case 'Fetch':
				var s = msg.a;
				var wp = $elm$core$Maybe$Just(s);
				var curCmd = function () {
					if (s === '-1') {
						return $elm$core$Platform$Cmd$none;
					} else {
						var newWp = $author$project$Ajourhold$Types$toWorkPlace(wp);
						var curWp = $author$project$Ajourhold$Types$toWorkPlace(model.selectedWorkPlace);
						return $elm$core$Platform$Cmd$batch(
							_List_fromArray(
								[
									A5($author$project$Ajourhold$Commands$fetchCoverFor, model.mainUrl, model.userId, wp, model.dateFrom, model.dateTo),
									A4(
									$author$project$Ajourhold$Commands$fetchTimebankWorkPlace,
									model.mainUrl,
									$author$project$Ajourhold$Types$UserId(model.userId),
									curWp,
									newWp)
								]));
					}
				}();
				var newModel = (s === '-1') ? _Utils_update(
					model,
					{hourFrom: $elm$core$Maybe$Nothing, hourTo: $elm$core$Maybe$Nothing, saldo: $elm$core$Maybe$Nothing, selectedReasonCode: $elm$core$Maybe$Nothing, selectedWatch: $elm$core$Maybe$Nothing, selectedWorkPlace: wp, sumHours: $elm$core$Maybe$Nothing, watchDefs: $elm$core$Maybe$Nothing, watches: $elm$core$Maybe$Nothing}) : _Utils_update(
					model,
					{hourFrom: $elm$core$Maybe$Nothing, hourTo: $elm$core$Maybe$Nothing, selectedReasonCode: $elm$core$Maybe$Nothing, selectedWatch: $elm$core$Maybe$Nothing, selectedWorkPlace: wp, sumHours: $elm$core$Maybe$Nothing, watchDefs: $elm$core$Maybe$Nothing, watches: $elm$core$Maybe$Nothing});
				return _Utils_Tuple2(newModel, curCmd);
			case 'Fetched':
				if (msg.a.$ === 'Ok') {
					var s = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{watchDefs: s.watchDefs, watches: s.watches}),
						$elm$core$Platform$Cmd$none);
				} else {
					var s = msg.a.a;
					return _Utils_Tuple2(
						A4($author$project$Common$ModalDialog$errorAlert, $elm$core$Maybe$Nothing, 'updateCoverFor Error:', s, model),
						$elm$core$Platform$Cmd$none);
				}
			default:
				if (msg.a.$ === 'Ok') {
					var s = msg.a.a;
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				} else {
					var s = msg.a.a;
					return _Utils_Tuple2(
						A4($author$project$Common$ModalDialog$errorAlert, $elm$core$Maybe$Nothing, 'updateWatch1 Error:', s, model),
						$elm$core$Platform$Cmd$none);
				}
		}
	});
var $author$project$Ajourhold$Commands$fetchWatches = F6(
	function (mu, ajCat, userId, workPlace, dateFrom, dateTo) {
		return A8(
			$author$project$Ajourhold$Commands$fetchWatches_,
			mu,
			$elm$core$Maybe$Just(ajCat),
			'/WatchesFor',
			A2(
				$elm$core$Basics$composeL,
				$author$project$Ajourhold$Types$WatchMsgFor($author$project$Ajourhold$Types$Watch1),
				$author$project$Ajourhold$Types$Fetched),
			userId,
			workPlace,
			dateFrom,
			dateTo);
	});
var $author$project$Ajourhold$Commands$isDateFromLess = function (model) {
	var _v0 = model.dateFrom;
	if (_v0.$ === 'Nothing') {
		return true;
	} else {
		var dx = _v0.a;
		var _v1 = model.dateTo;
		if (_v1.$ === 'Nothing') {
			return false;
		} else {
			var dx2 = _v1.a;
			return _Utils_cmp(dx, dx2) > 0;
		}
	}
};
var $author$project$Ajourhold$Update$updateEmergency = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'Changed':
				var s = msg.a;
				var w = A2($author$project$Ajourhold$Commands$getWatchDef, s, model.watchDefs);
				var sumStr = A2($author$project$Common$Misc$formatNumberStr, w.len, 2);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							hourFrom: $elm$core$Maybe$Just(w.hourFrom),
							hourTo: $elm$core$Maybe$Just(w.hourTo),
							selectedWatch: $elm$core$Maybe$Just(s),
							sumHours: $elm$core$Maybe$Just(sumStr)
						}),
					$elm$core$Platform$Cmd$none);
			case 'DateChanged':
				var s = msg.b;
				var myDateFrom = $author$project$Ajourhold$Update$maybeDate(s);
				var curModel = _Utils_update(
					model,
					{dateFrom: myDateFrom, hourFrom: $elm$core$Maybe$Nothing, hourTo: $elm$core$Maybe$Nothing, selectedWatch: $elm$core$Maybe$Nothing});
				var curCmd = A6($author$project$Ajourhold$Commands$fetchWatches, model.mainUrl, 2, model.userId, model.selectedWorkPlace, myDateFrom, model.dateTo);
				return _Utils_Tuple2(curModel, curCmd);
			case 'Fetch':
				var s = msg.a;
				var wp = $elm$core$Maybe$Just(s);
				var newWp = $author$project$Ajourhold$Types$toWorkPlace(wp);
				var curWp = $author$project$Ajourhold$Types$toWorkPlace(model.selectedWorkPlace);
				var curCmd = (s === '-1') ? $elm$core$Platform$Cmd$none : ($author$project$Ajourhold$Commands$isDateFromLess(model) ? A4(
					$author$project$Ajourhold$Commands$fetchTimebankWorkPlace,
					model.mainUrl,
					$author$project$Ajourhold$Types$UserId(model.userId),
					curWp,
					newWp) : $elm$core$Platform$Cmd$batch(
					_List_fromArray(
						[
							A6($author$project$Ajourhold$Commands$fetchWatches, model.mainUrl, model.ajcat, model.userId, wp, model.dateFrom, model.dateTo),
							A4(
							$author$project$Ajourhold$Commands$fetchTimebankWorkPlace,
							model.mainUrl,
							$author$project$Ajourhold$Types$UserId(model.userId),
							curWp,
							newWp)
						])));
				var newModel = (s === '-1') ? _Utils_update(
					model,
					{hourFrom: $elm$core$Maybe$Nothing, hourTo: $elm$core$Maybe$Nothing, saldo: $elm$core$Maybe$Nothing, selectedWatch: $elm$core$Maybe$Nothing, selectedWorkPlace: wp, sumHours: $elm$core$Maybe$Nothing, watchDefs: $elm$core$Maybe$Nothing, watches: $elm$core$Maybe$Nothing}) : _Utils_update(
					model,
					{hourFrom: $elm$core$Maybe$Nothing, hourTo: $elm$core$Maybe$Nothing, selectedWatch: $elm$core$Maybe$Nothing, selectedWorkPlace: wp, sumHours: $elm$core$Maybe$Nothing, watchDefs: $elm$core$Maybe$Nothing, watches: $elm$core$Maybe$Nothing});
				return _Utils_Tuple2(newModel, curCmd);
			case 'Fetched':
				if (msg.a.$ === 'Ok') {
					var s = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{watchDefs: s.watchDefs, watches: s.watches}),
						$elm$core$Platform$Cmd$none);
				} else {
					var s = msg.a.a;
					return _Utils_Tuple2(
						A4($author$project$Common$ModalDialog$errorAlert, $elm$core$Maybe$Nothing, 'updateEmergency Error:', s, model),
						$elm$core$Platform$Cmd$none);
				}
			default:
				if (msg.a.$ === 'Ok') {
					var s = msg.a.a;
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				} else {
					var s = msg.a.a;
					return _Utils_Tuple2(
						A4($author$project$Common$ModalDialog$errorAlert, $elm$core$Maybe$Nothing, 'updateWatch1 Error:', s, model),
						$elm$core$Platform$Cmd$none);
				}
		}
	});
var $author$project$Ajourhold$Types$NoDate = {$: 'NoDate'};
var $author$project$Ajourhold$Types$SlideMsgFor = function (a) {
	return {$: 'SlideMsgFor', a: a};
};
var $author$project$Ajourhold$Types$SlideWatchFetched = F2(
	function (a, b) {
		return {$: 'SlideWatchFetched', a: a, b: b};
	});
var $author$project$Ajourhold$Types$fromMyDate = function (dx) {
	if (dx.$ === 'NoDate') {
		return '-1';
	} else {
		var s = dx.a;
		return s;
	}
};
var $author$project$Ajourhold$Commands$fetchSlideFrom = F4(
	function (_v0, _v1, wp, cd) {
		var mainUrl = _v0.a;
		var userId = _v1.a;
		if (_Utils_eq(wp, $author$project$Ajourhold$Types$NoWorkPlace) || _Utils_eq(cd, $author$project$Ajourhold$Types$NoDate)) {
			return $elm$core$Platform$Cmd$none;
		} else {
			var url = mainUrl + ('/WatchesFor?messageType=4' + ('&workPlace=' + ($author$project$Ajourhold$Types$fromWorkPlace(wp) + ('&userid=' + (userId + ('&dateFrom=' + ($author$project$Ajourhold$Types$fromMyDate(cd) + ('&dateTo=' + $author$project$Ajourhold$Types$fromMyDate(cd)))))))));
			return A2(
				$elm$http$Http$send,
				A2(
					$elm$core$Basics$composeL,
					$author$project$Ajourhold$Types$SlideMsgFor,
					$author$project$Ajourhold$Types$SlideWatchFetched(1)),
				A2($elm$http$Http$get, url, $author$project$Ajourhold$Decoders$watchInfoDecoder));
		}
	});
var $author$project$Ajourhold$Commands$fetchSlideTo = F6(
	function (_v0, _v1, wp, tlid, odf, cd) {
		var mainUrl = _v0.a;
		var userId = _v1.a;
		if (_Utils_eq(wp, $author$project$Ajourhold$Types$NoWorkPlace) || (_Utils_eq(cd, $author$project$Ajourhold$Types$NoDate) || (_Utils_eq(odf, $author$project$Ajourhold$Types$NoDate) || _Utils_eq(tlid, $elm$core$Maybe$Nothing)))) {
			return $elm$core$Platform$Cmd$none;
		} else {
			var tl = A2($elm$core$Maybe$withDefault, '-', tlid);
			var url = mainUrl + ('/WatchesForSlideTo?twp=' + ($author$project$Ajourhold$Types$fromWorkPlace(wp) + ('&odf=' + ($author$project$Ajourhold$Types$fromMyDate(odf) + ('&userid=' + (userId + ('&tlid=' + (tl + ('&dt=' + $author$project$Ajourhold$Types$fromMyDate(cd))))))))));
			return A2(
				$elm$http$Http$send,
				A2(
					$elm$core$Basics$composeL,
					$author$project$Ajourhold$Types$SlideMsgFor,
					$author$project$Ajourhold$Types$SlideWatchFetched(2)),
				A2($elm$http$Http$get, url, $author$project$Ajourhold$Decoders$watchInfoDecoder));
		}
	});
var $author$project$Ajourhold$Types$MyDate = function (a) {
	return {$: 'MyDate', a: a};
};
var $author$project$Ajourhold$Types$toMyDate = function (s) {
	if (s.$ === 'Nothing') {
		return $author$project$Ajourhold$Types$NoDate;
	} else {
		var sx = s.a;
		return (sx === '-1') ? $author$project$Ajourhold$Types$NoDate : $author$project$Ajourhold$Types$MyDate(sx);
	}
};
var $author$project$Ajourhold$Update$updateSlide = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'SlideDateChanged':
				var index = msg.a;
				var s = msg.b;
				var usr = $author$project$Ajourhold$Types$UserId(model.userId);
				var newModel = (index === 1) ? _Utils_update(
					model,
					{
						dateFrom: $elm$core$Maybe$Just(s)
					}) : _Utils_update(
					model,
					{
						dateTo: $elm$core$Maybe$Just(s)
					});
				var curWp = $author$project$Ajourhold$Types$toWorkPlace(model.selectedWorkPlace);
				var curFromDate = $author$project$Ajourhold$Types$toMyDate(model.dateFrom);
				var curDate = $author$project$Ajourhold$Types$toMyDate(
					$elm$core$Maybe$Just(s));
				var slideFn = (index === 1) ? A4($author$project$Ajourhold$Commands$fetchSlideFrom, model.mainUrl, usr, curWp, curDate) : A6($author$project$Ajourhold$Commands$fetchSlideTo, model.mainUrl, usr, curWp, model.selectedWatch, curFromDate, curDate);
				return _Utils_Tuple2(newModel, slideFn);
			case 'SlideWatchChanged':
				var index = msg.a;
				var s = msg.b;
				var w = (index === 1) ? A2($author$project$Ajourhold$Commands$getWatchDef, s, model.watchDefs) : A2($author$project$Ajourhold$Commands$getWatchDef, s, model.watchDefs2);
				var sumStr = A2($author$project$Common$Misc$formatNumberStr, w.len, 2);
				var newModel = (index === 1) ? _Utils_update(
					model,
					{
						hourFrom: $elm$core$Maybe$Just(w.hourFrom),
						hourTo: $elm$core$Maybe$Just(w.hourTo),
						selectedWatch: $elm$core$Maybe$Just(s),
						sumHours: $elm$core$Maybe$Just(sumStr)
					}) : _Utils_update(
					model,
					{
						hourFrom2: $elm$core$Maybe$Just(w.hourFrom),
						hourTo2: $elm$core$Maybe$Just(w.hourTo),
						selectedWatch2: $elm$core$Maybe$Just(s),
						sumHours2: $elm$core$Maybe$Just(sumStr)
					});
				return _Utils_Tuple2(newModel, $elm$core$Platform$Cmd$none);
			case 'SlideWorkPlaceChanged':
				var index = msg.a;
				var s = msg.b;
				var usr = $author$project$Ajourhold$Types$UserId(model.userId);
				var newModel = (index === 1) ? _Utils_update(
					model,
					{
						selectedWatch: $elm$core$Maybe$Nothing,
						selectedWorkPlace: $elm$core$Maybe$Just(s)
					}) : _Utils_update(
					model,
					{
						selectedWatch2: $elm$core$Maybe$Nothing,
						selectedWorkPlace2: $elm$core$Maybe$Just(s)
					});
				var curWp = $author$project$Ajourhold$Types$toWorkPlace(
					$elm$core$Maybe$Just(s));
				var curFromDate = $author$project$Ajourhold$Types$toMyDate(model.dateFrom);
				var curDate = (index === 1) ? $author$project$Ajourhold$Types$toMyDate(model.dateFrom) : $author$project$Ajourhold$Types$toMyDate(model.dateTo);
				var slideFn = (index === 1) ? A4($author$project$Ajourhold$Commands$fetchSlideFrom, model.mainUrl, usr, curWp, curDate) : A6($author$project$Ajourhold$Commands$fetchSlideTo, model.mainUrl, usr, curWp, model.selectedWatch, curFromDate, curDate);
				return _Utils_Tuple2(newModel, slideFn);
			default:
				if (msg.b.$ === 'Ok') {
					var index = msg.a;
					var s = msg.b.a;
					var newModel = (index === 1) ? _Utils_update(
						model,
						{selectedWatch: $elm$core$Maybe$Nothing, watchDefs: s.watchDefs, watches: s.watches}) : _Utils_update(
						model,
						{selectedWatch2: $elm$core$Maybe$Nothing, watchDefs2: s.watchDefs, watches2: s.watches});
					return _Utils_Tuple2(newModel, $elm$core$Platform$Cmd$none);
				} else {
					var err = msg.b.a;
					return _Utils_Tuple2(
						A4($author$project$Common$ModalDialog$errorAlert, $elm$core$Maybe$Nothing, 'updateSlide Error:', err, model),
						$elm$core$Platform$Cmd$none);
				}
		}
	});
var $author$project$Ajourhold$Types$Swap = function (a) {
	return {$: 'Swap', a: a};
};
var $author$project$Ajourhold$Commands$fetchWatchesSwapFrom = F4(
	function (_v0, userId, workPlace, dateFrom) {
		var mainUrl = _v0.a;
		if (_Utils_eq(workPlace, $elm$core$Maybe$Nothing) || _Utils_eq(dateFrom, $elm$core$Maybe$Nothing)) {
			return $elm$core$Platform$Cmd$none;
		} else {
			var wp = A2($elm$core$Maybe$withDefault, '-', workPlace);
			var myCmd = A2(
				$elm$core$Basics$composeL,
				$author$project$Ajourhold$Types$WatchMsgFor(
					$author$project$Ajourhold$Types$Swap(1)),
				$author$project$Ajourhold$Types$Fetched);
			var df = A2($elm$core$Maybe$withDefault, '-', dateFrom);
			var url = mainUrl + ('/WatchesFor' + ('?messageType=512' + ('&workPlace=' + (wp + ('&userid=' + (userId + ('&dateFrom=' + (df + ('&dateTo=' + df)))))))));
			return A2(
				$elm$http$Http$send,
				myCmd,
				A2($elm$http$Http$get, url, $author$project$Ajourhold$Decoders$watchInfoDecoder));
		}
	});
var $author$project$Ajourhold$Commands$fetchWatchesSwapTo = F6(
	function (_v0, userId, workPlace, dateFrom, dateTo, orgwatchid) {
		var mainUrl = _v0.a;
		if (_Utils_eq(workPlace, $elm$core$Maybe$Nothing) || _Utils_eq(dateFrom, $elm$core$Maybe$Nothing)) {
			return $elm$core$Platform$Cmd$none;
		} else {
			var wp = A2($elm$core$Maybe$withDefault, '-', workPlace);
			var wid = A2($elm$core$Maybe$withDefault, '-', orgwatchid);
			var myCmd = A2(
				$elm$core$Basics$composeL,
				$author$project$Ajourhold$Types$WatchMsgFor(
					$author$project$Ajourhold$Types$Swap(2)),
				$author$project$Ajourhold$Types$Fetched);
			var dt = A2($elm$core$Maybe$withDefault, '-', dateTo);
			var df = A2($elm$core$Maybe$withDefault, '-', dateFrom);
			var url = mainUrl + ('/WatchesForSwapTo?workPlace=' + (wp + ('&userid=' + (userId + ('&dateFrom=' + (df + ('&dateTo=' + (dt + ('&orgwid=' + wid)))))))));
			return A2(
				$elm$http$Http$send,
				myCmd,
				A2($elm$http$Http$get, url, $author$project$Ajourhold$Decoders$watchInfoDecoder));
		}
	});
var $author$project$Ajourhold$Update$updateSwap = F3(
	function (index, msg, model) {
		switch (msg.$) {
			case 'Changed':
				var s = msg.a;
				return (index === 1) ? _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectedWatch: $elm$core$Maybe$Just(s)
						}),
					$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectedWatch2: $elm$core$Maybe$Just(s)
						}),
					$elm$core$Platform$Cmd$none);
			case 'DateChanged':
				var s = msg.b;
				var wp = (index === 1) ? model.selectedWorkPlace : model.selectedWorkPlace2;
				var newDate = $author$project$Ajourhold$Update$maybeDate(s);
				var updMod = (index === 1) ? _Utils_update(
					model,
					{dateFrom: newDate, selectedWatch: $elm$core$Maybe$Nothing, watches: $elm$core$Maybe$Nothing}) : _Utils_update(
					model,
					{dateTo: newDate, selectedWatch2: $elm$core$Maybe$Nothing, watches2: $elm$core$Maybe$Nothing});
				var curCmd = (s === '-1') ? $elm$core$Platform$Cmd$none : ((index === 1) ? A4($author$project$Ajourhold$Commands$fetchWatchesSwapFrom, updMod.mainUrl, updMod.userId, wp, newDate) : A6($author$project$Ajourhold$Commands$fetchWatchesSwapTo, updMod.mainUrl, updMod.userId, wp, updMod.dateFrom, newDate, model.selectedWatch));
				return _Utils_Tuple2(updMod, curCmd);
			case 'Fetch':
				var s = msg.a;
				var wp = $elm$core$Maybe$Just(s);
				var updMod = (index === 1) ? _Utils_update(
					model,
					{selectedWatch: $elm$core$Maybe$Nothing, selectedWorkPlace: wp, watches: $elm$core$Maybe$Nothing}) : _Utils_update(
					model,
					{selectedWatch2: $elm$core$Maybe$Nothing, selectedWorkPlace2: wp, watches2: $elm$core$Maybe$Nothing});
				var curCmd = (s === '-1') ? $elm$core$Platform$Cmd$none : ((index === 1) ? A4($author$project$Ajourhold$Commands$fetchWatchesSwapFrom, updMod.mainUrl, updMod.userId, wp, updMod.dateFrom) : A6($author$project$Ajourhold$Commands$fetchWatchesSwapTo, updMod.mainUrl, updMod.userId, wp, updMod.dateFrom, updMod.dateTo, updMod.selectedWatch));
				return _Utils_Tuple2(updMod, curCmd);
			case 'Fetched':
				if (msg.a.$ === 'Ok') {
					var s = msg.a.a;
					return (index === 1) ? _Utils_Tuple2(
						_Utils_update(
							model,
							{watches: s.watches}),
						$elm$core$Platform$Cmd$none) : _Utils_Tuple2(
						_Utils_update(
							model,
							{watches2: s.watches}),
						$elm$core$Platform$Cmd$none);
				} else {
					var s = msg.a.a;
					return _Utils_Tuple2(
						A4($author$project$Common$ModalDialog$errorAlert, $elm$core$Maybe$Nothing, 'updateSwap Error:', s, model),
						$elm$core$Platform$Cmd$none);
				}
			default:
				if (msg.a.$ === 'Ok') {
					var s = msg.a.a;
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				} else {
					var s = msg.a.a;
					return _Utils_Tuple2(
						A4($author$project$Common$ModalDialog$errorAlert, $elm$core$Maybe$Nothing, 'updateWatch1 Error:', s, model),
						$elm$core$Platform$Cmd$none);
				}
		}
	});
var $author$project$Ajourhold$Update$updateWatch1 = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'Changed':
				var s = msg.a;
				var w = A2($author$project$Ajourhold$Commands$getWatchDef, s, model.watchDefs);
				var sumStr = A2($author$project$Common$Misc$formatNumberStr, w.len, 2);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							hourFrom: $elm$core$Maybe$Just(w.hourFrom),
							hourTo: $elm$core$Maybe$Just(w.hourTo),
							selectedWatch: $elm$core$Maybe$Just(s),
							sumHours: $elm$core$Maybe$Just(sumStr)
						}),
					$elm$core$Platform$Cmd$none);
			case 'DateChanged':
				var index = msg.a;
				var s = msg.b;
				var myDateFrom = $author$project$Ajourhold$Update$maybeDate(s);
				var curModel = (index === 1) ? _Utils_update(
					model,
					{dateFrom: myDateFrom, hourFrom: $elm$core$Maybe$Nothing, hourTo: $elm$core$Maybe$Nothing, selectedWatch: $elm$core$Maybe$Nothing}) : _Utils_update(
					model,
					{dateTo: myDateFrom, hourFrom: $elm$core$Maybe$Nothing, hourTo: $elm$core$Maybe$Nothing, selectedWatch: $elm$core$Maybe$Nothing});
				var curCmd = A6($author$project$Ajourhold$Commands$fetchWatches, model.mainUrl, model.ajcat, model.userId, model.selectedWorkPlace, myDateFrom, model.dateTo);
				return _Utils_Tuple2(curModel, curCmd);
			case 'Fetch':
				var s = msg.a;
				var wp = $elm$core$Maybe$Just(s);
				var newWp = $author$project$Ajourhold$Types$toWorkPlace(wp);
				var curWp = $author$project$Ajourhold$Types$toWorkPlace(model.selectedWorkPlace);
				var curCmd = (s === '-1') ? $elm$core$Platform$Cmd$none : ($author$project$Ajourhold$Commands$isDateFromLess(model) ? A4(
					$author$project$Ajourhold$Commands$fetchTimebankWorkPlace,
					model.mainUrl,
					$author$project$Ajourhold$Types$UserId(model.userId),
					curWp,
					newWp) : $elm$core$Platform$Cmd$batch(
					_List_fromArray(
						[
							A6($author$project$Ajourhold$Commands$fetchWatches, model.mainUrl, model.ajcat, model.userId, wp, model.dateFrom, model.dateTo),
							A4(
							$author$project$Ajourhold$Commands$fetchTimebankWorkPlace,
							model.mainUrl,
							$author$project$Ajourhold$Types$UserId(model.userId),
							curWp,
							newWp)
						])));
				var newModel = (s === '-1') ? _Utils_update(
					model,
					{hourFrom: $elm$core$Maybe$Nothing, hourTo: $elm$core$Maybe$Nothing, saldo: $elm$core$Maybe$Nothing, selectedWatch: $elm$core$Maybe$Nothing, selectedWorkPlace: wp, sumHours: $elm$core$Maybe$Nothing, watchDefs: $elm$core$Maybe$Nothing, watches: $elm$core$Maybe$Nothing}) : _Utils_update(
					model,
					{hourFrom: $elm$core$Maybe$Nothing, hourTo: $elm$core$Maybe$Nothing, selectedWatch: $elm$core$Maybe$Nothing, selectedWorkPlace: wp, sumHours: $elm$core$Maybe$Nothing, watchDefs: $elm$core$Maybe$Nothing, watches: $elm$core$Maybe$Nothing});
				return _Utils_Tuple2(newModel, curCmd);
			case 'Fetched':
				if (msg.a.$ === 'Ok') {
					var s = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{watchDefs: s.watchDefs, watches: s.watches}),
						$elm$core$Platform$Cmd$none);
				} else {
					var s = msg.a.a;
					return _Utils_Tuple2(
						A4($author$project$Common$ModalDialog$errorAlert, $elm$core$Maybe$Nothing, 'updateWatch1 Error:', s, model),
						$elm$core$Platform$Cmd$none);
				}
			default:
				if (msg.a.$ === 'Ok') {
					var s = msg.a.a;
					var mySaldo = $elm$core$String$fromFloat(
						A2($author$project$Common$Misc$toDecimal, s.value, 100.0));
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								saldo: $elm$core$Maybe$Just(mySaldo)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var s = msg.a.a;
					return _Utils_Tuple2(
						A4($author$project$Common$ModalDialog$errorAlert, $elm$core$Maybe$Nothing, 'updateWatch1 Error:', s, model),
						$elm$core$Platform$Cmd$none);
				}
		}
	});
var $author$project$Ajourhold$Types$Watch2 = {$: 'Watch2'};
var $author$project$Ajourhold$Commands$fetchWatches2 = F5(
	function (mu, userId, workPlace, dateFrom, dateTo) {
		return A8(
			$author$project$Ajourhold$Commands$fetchWatches_,
			mu,
			$elm$core$Maybe$Nothing,
			'/WatchesForSwapTo',
			A2(
				$elm$core$Basics$composeL,
				$author$project$Ajourhold$Types$WatchMsgFor($author$project$Ajourhold$Types$Watch2),
				$author$project$Ajourhold$Types$Fetched),
			userId,
			workPlace,
			dateFrom,
			dateTo);
	});
var $author$project$Ajourhold$Update$updateWatch2 = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'Changed':
				var s = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectedWatch2: $elm$core$Maybe$Just(s)
						}),
					$elm$core$Platform$Cmd$none);
			case 'DateChanged':
				return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
			case 'Fetch':
				var s = msg.a;
				var wp = $elm$core$Maybe$Just(s);
				var curCmd = (s === '-1') ? $elm$core$Platform$Cmd$none : A5($author$project$Ajourhold$Commands$fetchWatches2, model.mainUrl, model.userId, wp, model.dateFrom, model.dateTo);
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{selectedWatch2: $elm$core$Maybe$Nothing, selectedWorkPlace2: wp, watches2: $elm$core$Maybe$Nothing}),
					curCmd);
			case 'Fetched':
				if (msg.a.$ === 'Ok') {
					var s = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{watchDefs: s.watchDefs, watches: s.watches}),
						$elm$core$Platform$Cmd$none);
				} else {
					var s = msg.a.a;
					return _Utils_Tuple2(
						A4($author$project$Common$ModalDialog$errorAlert, $elm$core$Maybe$Nothing, 'updateWatch2 Error:', s, model),
						$elm$core$Platform$Cmd$none);
				}
			default:
				if (msg.a.$ === 'Ok') {
					var s = msg.a.a;
					return _Utils_Tuple2(model, $elm$core$Platform$Cmd$none);
				} else {
					var s = msg.a.a;
					return _Utils_Tuple2(
						A4($author$project$Common$ModalDialog$errorAlert, $elm$core$Maybe$Nothing, 'updateWatch1 Error:', s, model),
						$elm$core$Platform$Cmd$none);
				}
		}
	});
var $author$project$Ajourhold$Update$update = F2(
	function (msg, model) {
		switch (msg.$) {
			case 'WatchMsgFor':
				var category = msg.a;
				var wmsg = msg.b;
				switch (category.$) {
					case 'Watch1':
						return A2($author$project$Ajourhold$Update$updateWatch1, wmsg, model);
					case 'Watch2':
						return A2($author$project$Ajourhold$Update$updateWatch2, wmsg, model);
					case 'CoverFor':
						return A2($author$project$Ajourhold$Update$updateCoverFor, wmsg, model);
					case 'Swap':
						var index = category.a;
						return A3($author$project$Ajourhold$Update$updateSwap, index, wmsg, model);
					default:
						return A2($author$project$Ajourhold$Update$updateEmergency, wmsg, model);
				}
			case 'AlertOk':
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{dlgAlert: $author$project$Common$ModalDialog$DialogHidden}),
					$elm$core$Platform$Cmd$none);
			case 'InitDataFetched':
				if (msg.a.$ === 'Ok') {
					var s = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								reasonCodes: s.reasonCodes,
								userId: s.userId,
								vacation: s.vacation,
								workPlaces: $elm$core$Maybe$Just(s.workPlaces)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var s = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								dlgAlert: A3(
									$author$project$Common$ModalDialog$DialogVisibleAlert,
									'Subscriptions',
									'InitDataFetched Error: ' + $elm$json$Json$Decode$errorToString(s),
									$author$project$Common$ModalDialog$Error)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'WorkPlaceChanged':
				var s = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectedWorkPlace: $elm$core$Maybe$Just(s)
						}),
					$elm$core$Platform$Cmd$none);
			case 'WorkPlacesFetched':
				if (msg.a.$ === 'Ok') {
					var s = msg.a.a;
					var mySaldo = $elm$core$String$fromFloat(
						A2($author$project$Common$Misc$toDecimal, s.saldo, 100.0));
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								saldo: $elm$core$Maybe$Just(mySaldo),
								userId: s.userId,
								vacation: s.vacation,
								workPlaces: $elm$core$Maybe$Just(s.workPlaces),
								workPlaces2: $elm$core$Maybe$Just(s.workPlaces)
							}),
						$elm$core$Platform$Cmd$none);
				} else {
					var s = msg.a.a;
					return _Utils_Tuple2(
						_Utils_update(
							model,
							{
								dlgAlert: A3(
									$author$project$Common$ModalDialog$DialogVisibleAlert,
									'Subscriptions',
									'WorkPlacesFetched Error: ' + $elm$json$Json$Decode$errorToString(s),
									$author$project$Common$ModalDialog$Error)
							}),
						$elm$core$Platform$Cmd$none);
				}
			case 'ReasonCodeChanged':
				var s = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							selectedReasonCode: $elm$core$Maybe$Just(s)
						}),
					$elm$core$Platform$Cmd$none);
			case 'MeldingChanged':
				var s = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							melding: $elm$core$Maybe$Just(s)
						}),
					$elm$core$Platform$Cmd$none);
			case 'SimpleDateChanged':
				var index = msg.a;
				var s = msg.b;
				var curDate = $author$project$Ajourhold$Update$maybeDate(s);
				var updMod = (index === 1) ? _Utils_update(
					model,
					{dateFrom: curDate}) : _Utils_update(
					model,
					{dateTo: curDate});
				return _Utils_Tuple2(updMod, $elm$core$Platform$Cmd$none);
			case 'HourChanged':
				var index = msg.a;
				var s = msg.b;
				var updMod = function () {
					switch (index) {
						case 1:
							var curSumHours = A2(
								$author$project$Ajourhold$Update$calcSumHours,
								$elm$core$Maybe$Just(s),
								model.hourTo);
							return _Utils_update(
								model,
								{
									hourFrom: $elm$core$Maybe$Just(s),
									selectedWatch: $elm$core$Maybe$Nothing,
									sumHours: $elm$core$Maybe$Just(curSumHours)
								});
						case 2:
							var curSumHours = A2(
								$author$project$Ajourhold$Update$calcSumHours,
								model.hourFrom,
								$elm$core$Maybe$Just(s));
							return _Utils_update(
								model,
								{
									hourTo: $elm$core$Maybe$Just(s),
									selectedWatch: $elm$core$Maybe$Nothing,
									sumHours: $elm$core$Maybe$Just(curSumHours)
								});
						case 21:
							var curSumHours = A2(
								$author$project$Ajourhold$Update$calcSumHours,
								$elm$core$Maybe$Just(s),
								model.hourTo2);
							return _Utils_update(
								model,
								{
									hourFrom2: $elm$core$Maybe$Just(s),
									selectedWatch2: $elm$core$Maybe$Nothing,
									sumHours2: $elm$core$Maybe$Just(curSumHours)
								});
						case 31:
							var curSumHours = A2(
								$author$project$Ajourhold$Update$calcSumHours,
								$elm$core$Maybe$Just(s),
								model.hourTo);
							return _Utils_update(
								model,
								{
									hourFrom: $elm$core$Maybe$Just(s),
									sumHours: $elm$core$Maybe$Just(curSumHours)
								});
						case 32:
							var curSumHours = A2(
								$author$project$Ajourhold$Update$calcSumHours,
								model.hourFrom,
								$elm$core$Maybe$Just(s));
							return _Utils_update(
								model,
								{
									hourTo: $elm$core$Maybe$Just(s),
									sumHours: $elm$core$Maybe$Just(curSumHours)
								});
						default:
							var curSumHours = A2(
								$author$project$Ajourhold$Update$calcSumHours,
								model.hourFrom2,
								$elm$core$Maybe$Just(s));
							return _Utils_update(
								model,
								{
									hourTo2: $elm$core$Maybe$Just(s),
									selectedWatch2: $elm$core$Maybe$Nothing,
									sumHours2: $elm$core$Maybe$Just(curSumHours)
								});
					}
				}();
				return _Utils_Tuple2(updMod, $elm$core$Platform$Cmd$none);
			case 'ToTimeBankChanged':
				var s = msg.a;
				return _Utils_Tuple2(
					_Utils_update(
						model,
						{
							toTimeBank: $elm$core$Maybe$Just(s)
						}),
					$elm$core$Platform$Cmd$none);
			case 'SendData':
				var sendMsg = msg.a;
				if (sendMsg.$ === 'Send') {
					return _Utils_Tuple2(
						model,
						$author$project$Ajourhold$Commands$sendData(model));
				} else {
					if (sendMsg.a.$ === 'Ok') {
						var s = sendMsg.a.a;
						var dialogState = function () {
							if (s.ok) {
								var title = A2($author$project$Common$Misc$getLangValue, 'data_sent_ok', model.lang);
								return A3($author$project$Common$ModalDialog$DialogVisibleAlert, title, s.msg, $author$project$Common$ModalDialog$Info);
							} else {
								var title = A2($author$project$Common$Misc$getLangValue, 'data_sent_err', model.lang);
								return A3($author$project$Common$ModalDialog$DialogVisibleAlert, title, s.msg, $author$project$Common$ModalDialog$Error);
							}
						}();
						var newModel = A2($author$project$Ajourhold$Update$resetModel, model, dialogState);
						return _Utils_Tuple2(newModel, $elm$core$Platform$Cmd$none);
					} else {
						var s = sendMsg.a.a;
						return _Utils_Tuple2(
							A4($author$project$Common$ModalDialog$errorAlert, $elm$core$Maybe$Nothing, 'Noe gikk galt under lagring:', s, model),
							$elm$core$Platform$Cmd$none);
					}
				}
			default:
				var slideMsg = msg.a;
				return A2($author$project$Ajourhold$Update$updateSlide, slideMsg, model);
		}
	});
var $author$project$Ajourhold$Types$AlertOk = {$: 'AlertOk'};
var $author$project$Ajourhold$Types$Changed = function (a) {
	return {$: 'Changed', a: a};
};
var $author$project$Ajourhold$Types$DateChanged = F2(
	function (a, b) {
		return {$: 'DateChanged', a: a, b: b};
	});
var $author$project$Ajourhold$Types$Fetch = function (a) {
	return {$: 'Fetch', a: a};
};
var $author$project$Ajourhold$Types$IsDisabled = function (a) {
	return {$: 'IsDisabled', a: a};
};
var $elm$html$Html$button = _VirtualDom_node('button');
var $elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$string(string));
	});
var $elm$html$Html$Attributes$class = $elm$html$Html$Attributes$stringProperty('className');
var $elm$html$Html$div = _VirtualDom_node('div');
var $elm$html$Html$h4 = _VirtualDom_node('h4');
var $elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var $elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var $elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var $elm$html$Html$Events$onClick = function (msg) {
	return A2(
		$elm$html$Html$Events$on,
		'click',
		$elm$json$Json$Decode$succeed(msg));
};
var $elm$html$Html$p = _VirtualDom_node('p');
var $elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var $elm$html$Html$Attributes$style = $elm$virtual_dom$VirtualDom$style;
var $elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var $elm$html$Html$text = $elm$virtual_dom$VirtualDom$text;
var $author$project$Common$ModalDialog$alert = F2(
	function (state, ok) {
		if (state.$ === 'DialogVisibleAlert') {
			var title = state.a;
			var msg = state.b;
			var alertCat = state.c;
			var titleDiv = A2(
				$elm$html$Html$h4,
				_List_Nil,
				_List_fromArray(
					[
						$elm$html$Html$text(title)
					]));
			var content = A2(
				$elm$html$Html$div,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						$elm$html$Html$p,
						_List_Nil,
						_List_fromArray(
							[
								$elm$html$Html$text(msg)
							]))
					]));
			var btnClass = function () {
				switch (alertCat.$) {
					case 'Info':
						return 'btn btn-info';
					case 'Warn':
						return 'btn btn-warning';
					default:
						return 'btn btn-danger';
				}
			}();
			var okButton = A2(
				$elm$html$Html$button,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class(btnClass),
						$elm$html$Html$Events$onClick(ok)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text('OK')
					]));
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('modalDialog'),
						A2($elm$html$Html$Attributes$style, 'opacity', '1'),
						A2($elm$html$Html$Attributes$style, 'pointer-events', 'auto')
					]),
				_List_fromArray(
					[
						A2(
						$elm$html$Html$div,
						_List_Nil,
						_List_fromArray(
							[titleDiv, content, okButton]))
					]));
		} else {
			return A2(
				$elm$html$Html$div,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$class('modalDialog'),
						A2($elm$html$Html$Attributes$style, 'opacity', '0'),
						A2($elm$html$Html$Attributes$style, 'pointer-events', 'none')
					]),
				_List_Nil);
		}
	});
var $author$project$Ajourhold$Types$Send = {$: 'Send'};
var $author$project$Common$Buttons$Success = {$: 'Success'};
var $author$project$Common$Buttons$buttonClass = function (b) {
	switch (b.$) {
		case 'Success':
			return 'btn btn-outline-success';
		case 'Danger':
			return 'btn btn-outline-danger';
		case 'DlgSuccess':
			return 'btn btn-outline-success btn-modal-dlg';
		default:
			return 'btn btn-outline-danger btn-modal-dlg';
	}
};
var $elm$json$Json$Encode$bool = _Json_wrap;
var $elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			$elm$json$Json$Encode$bool(bool));
	});
var $elm$html$Html$Attributes$disabled = $elm$html$Html$Attributes$boolProperty('disabled');
var $elm$core$Basics$not = _Basics_not;
var $elm$html$Html$Attributes$type_ = $elm$html$Html$Attributes$stringProperty('type');
var $author$project$Common$Buttons$button = F4(
	function (b, caption, isEnabled, clickEvent) {
		return A2(
			$elm$html$Html$button,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(
					$author$project$Common$Buttons$buttonClass(b)),
					$elm$html$Html$Events$onClick(clickEvent),
					$elm$html$Html$Attributes$type_('button'),
					$elm$html$Html$Attributes$disabled(!isEnabled)
				]),
			_List_fromArray(
				[
					$elm$html$Html$text(caption)
				]));
	});
var $author$project$Ajourhold$Commands$canSendData2 = function (m) {
	return (!_Utils_eq(m.dateFrom, $elm$core$Maybe$Nothing)) && ((!_Utils_eq(m.selectedWorkPlace, $elm$core$Maybe$Nothing)) && ((!_Utils_eq(m.selectedReasonCode, $elm$core$Maybe$Nothing)) && ((!_Utils_eq(m.selectedWatch, $elm$core$Maybe$Nothing)) && (!_Utils_eq(m.melding, $elm$core$Maybe$Nothing)))));
};
var $author$project$Ajourhold$Commands$canSendData3 = function (m) {
	return (!_Utils_eq(m.dateFrom, $elm$core$Maybe$Nothing)) && ((!_Utils_eq(m.selectedWorkPlace, $elm$core$Maybe$Nothing)) && ((!_Utils_eq(m.selectedWatch, $elm$core$Maybe$Nothing)) && ((!_Utils_eq(m.selectedWorkPlace2, $elm$core$Maybe$Nothing)) && ((!_Utils_eq(m.selectedWatch2, $elm$core$Maybe$Nothing)) && (!_Utils_eq(m.melding, $elm$core$Maybe$Nothing))))));
};
var $author$project$Ajourhold$Commands$canSendData_ = function (m) {
	return (!_Utils_eq(m.dateFrom, $elm$core$Maybe$Nothing)) && ((!_Utils_eq(m.selectedWorkPlace, $elm$core$Maybe$Nothing)) && ((!_Utils_eq(m.selectedReasonCode, $elm$core$Maybe$Nothing)) && (!_Utils_eq(m.melding, $elm$core$Maybe$Nothing))));
};
var $author$project$Ajourhold$Commands$canSendData = function (m) {
	var _v0 = m.ajcat;
	switch (_v0) {
		case 2:
			return $author$project$Ajourhold$Commands$canSendData2(m);
		case 3:
			return $author$project$Ajourhold$Commands$canSendData3(m);
		default:
			return $author$project$Ajourhold$Commands$canSendData_(m);
	}
};
var $author$project$Ajourhold$Views$ViewItems$btn = F2(
	function (model, _v0) {
		var gpos = _v0.a;
		var title = A2($author$project$Common$Misc$getLangValue, 'lagre', model.lang);
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(gpos)
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$div,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class('form-group')
						]),
					_List_fromArray(
						[
							A4(
							$author$project$Common$Buttons$button,
							$author$project$Common$Buttons$Success,
							title,
							$author$project$Ajourhold$Commands$canSendData(model),
							$author$project$Ajourhold$Types$SendData($author$project$Ajourhold$Types$Send))
						]))
				]));
	});
var $elm$html$Html$label = _VirtualDom_node('label');
var $author$project$Ajourhold$Views$ViewItems$formGroupItem = F3(
	function (clazz, title, myInput) {
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class('form-group')
				]),
			_List_fromArray(
				[
					A2(
					$elm$html$Html$label,
					_List_fromArray(
						[
							$elm$html$Html$Attributes$class(clazz)
						]),
					_List_fromArray(
						[
							$elm$html$Html$text(title)
						])),
					myInput
				]));
	});
var $elm$html$Html$input = _VirtualDom_node('input');
var $elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var $elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 'MayStopPropagation', a: a};
};
var $elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			$elm$virtual_dom$VirtualDom$on,
			event,
			$elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var $elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3($elm$core$List$foldr, $elm$json$Json$Decode$field, decoder, fields);
	});
var $elm$html$Html$Events$targetValue = A2(
	$elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	$elm$json$Json$Decode$string);
var $elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		$elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			$elm$json$Json$Decode$map,
			$elm$html$Html$Events$alwaysStop,
			A2($elm$json$Json$Decode$map, tagger, $elm$html$Html$Events$targetValue)));
};
var $elm$html$Html$Attributes$value = $elm$html$Html$Attributes$stringProperty('value');
var $author$project$Ajourhold$Views$ViewItems$dateItem = F3(
	function (title, value, event) {
		var value_ = A2($elm$core$Maybe$withDefault, '', value);
		var isMissing = _Utils_eq(value, $elm$core$Maybe$Nothing);
		var myClazz = isMissing ? 'missing' : '';
		var dateClazz = 'form-control date start-date';
		var myInput = A2(
			$elm$html$Html$input,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$value(value_),
					$elm$html$Html$Attributes$type_('date'),
					$elm$html$Html$Attributes$class(dateClazz),
					$elm$html$Html$Events$onInput(event)
				]),
			_List_Nil);
		return A3($author$project$Ajourhold$Views$ViewItems$formGroupItem, myClazz, title, myInput);
	});
var $author$project$Ajourhold$Types$GridPosition = function (a) {
	return {$: 'GridPosition', a: a};
};
var $author$project$Ajourhold$Views$ViewItems$gA1 = $author$project$Ajourhold$Types$GridPosition('grid-ajour-a1');
var $author$project$Ajourhold$Views$ViewItems$gridAjourItem = F2(
	function (_v0, item) {
		var clazz = _v0.a;
		return A2(
			$elm$html$Html$div,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$class(clazz)
				]),
			_List_fromArray(
				[item]));
	});
var $author$project$Ajourhold$Views$ViewItems$dateFrom = F2(
	function (model, msg) {
		var title = A2($author$project$Common$Misc$getLangValue, 'fra_dato', model.lang);
		return A2(
			$author$project$Ajourhold$Views$ViewItems$gridAjourItem,
			$author$project$Ajourhold$Views$ViewItems$gA1,
			A3($author$project$Ajourhold$Views$ViewItems$dateItem, title, model.dateFrom, msg));
	});
var $author$project$Ajourhold$Views$ViewItems$dateTo = F3(
	function (model, msg, gpos) {
		var title = A2($author$project$Common$Misc$getLangValue, 'til_dato', model.lang);
		return A2(
			$author$project$Ajourhold$Views$ViewItems$gridAjourItem,
			gpos,
			A3($author$project$Ajourhold$Views$ViewItems$dateItem, title, model.dateTo, msg));
	});
var $author$project$Ajourhold$Types$HourChanged = F2(
	function (a, b) {
		return {$: 'HourChanged', a: a, b: b};
	});
var $author$project$Ajourhold$Views$ViewItems$inputItem = F5(
	function (inputType, value, clazz, event, isDisabled) {
		if (event.$ === 'Nothing') {
			return A2(
				$elm$html$Html$input,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$value(value),
						$elm$html$Html$Attributes$type_(inputType),
						$elm$html$Html$Attributes$class(clazz),
						$elm$html$Html$Attributes$disabled(isDisabled)
					]),
				_List_Nil);
		} else {
			var event_ = event.a;
			return A2(
				$elm$html$Html$input,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$value(value),
						$elm$html$Html$Events$onInput(event_),
						$elm$html$Html$Attributes$type_(inputType),
						$elm$html$Html$Attributes$class(clazz),
						$elm$html$Html$Attributes$disabled(isDisabled)
					]),
				_List_Nil);
		}
	});
var $author$project$Ajourhold$Views$ViewItems$hourItem = F4(
	function (title, hourValue, event, isDisabled) {
		var isMissing = _Utils_eq(hourValue, $elm$core$Maybe$Nothing);
		var hourValue_ = A2($elm$core$Maybe$withDefault, '00:00', hourValue);
		var myInput = A5(
			$author$project$Ajourhold$Views$ViewItems$inputItem,
			'time',
			hourValue_,
			'form-control time',
			$elm$core$Maybe$Just(event),
			isDisabled);
		var clazz = isMissing ? 'col-form-label missing' : 'col-form-label';
		return A3($author$project$Ajourhold$Views$ViewItems$formGroupItem, clazz, title, myInput);
	});
var $author$project$Ajourhold$Views$ViewItems$fromHour = F3(
	function (model, _v0, gpos) {
		var isDisabled = _v0.a;
		var title = A2($author$project$Common$Misc$getLangValue, 'fra_kl', model.lang);
		var index = (model.ajcat === 2) ? 31 : 1;
		return A2(
			$author$project$Ajourhold$Views$ViewItems$gridAjourItem,
			gpos,
			A4(
				$author$project$Ajourhold$Views$ViewItems$hourItem,
				title,
				model.hourFrom,
				$author$project$Ajourhold$Types$HourChanged(index),
				isDisabled));
	});
var $author$project$Ajourhold$Views$ViewItems$gA2 = $author$project$Ajourhold$Types$GridPosition('grid-ajour-a2');
var $author$project$Ajourhold$Views$ViewItems$gB1 = $author$project$Ajourhold$Types$GridPosition('grid-ajour-b1');
var $author$project$Ajourhold$Views$ViewItems$gB2 = $author$project$Ajourhold$Types$GridPosition('grid-ajour-b2');
var $author$project$Ajourhold$Views$ViewItems$gC1 = $author$project$Ajourhold$Types$GridPosition('grid-ajour-c1');
var $author$project$Ajourhold$Views$ViewItems$gC2 = $author$project$Ajourhold$Types$GridPosition('grid-ajour-c2');
var $author$project$Ajourhold$Views$ViewItems$gC3 = $author$project$Ajourhold$Types$GridPosition('grid-ajour-c3');
var $author$project$Ajourhold$Views$ViewItems$gE1 = $author$project$Ajourhold$Types$GridPosition('grid-ajour-e1');
var $author$project$Ajourhold$Views$ViewItems$gE23 = $author$project$Ajourhold$Types$GridPosition('grid-ajour-e23');
var $author$project$Ajourhold$Views$ViewItems$gF1 = $author$project$Ajourhold$Types$GridPosition('grid-ajour-f1');
var $author$project$Ajourhold$Views$ViewItems$gD2 = $author$project$Ajourhold$Types$GridPosition('grid-ajour-d2');
var $author$project$Ajourhold$Views$ViewItems$hourBankBalance = function (model) {
	var title = A2($author$project$Common$Misc$getLangValue, 'timebank_saldo', model.lang);
	var mySaldo = A2($elm$core$Maybe$withDefault, '0.00', model.saldo);
	var timebankSaldoInput = A5($author$project$Ajourhold$Views$ViewItems$inputItem, 'number', mySaldo, 'form-control timebank', $elm$core$Maybe$Nothing, true);
	var tbs = A3($author$project$Ajourhold$Views$ViewItems$formGroupItem, 'col-form-label', title, timebankSaldoInput);
	return A2($author$project$Ajourhold$Views$ViewItems$gridAjourItem, $author$project$Ajourhold$Views$ViewItems$gD2, tbs);
};
var $author$project$Ajourhold$Types$MeldingChanged = function (a) {
	return {$: 'MeldingChanged', a: a};
};
var $elm$html$Html$Attributes$rows = function (n) {
	return A2(
		_VirtualDom_attribute,
		'rows',
		$elm$core$String$fromInt(n));
};
var $elm$html$Html$textarea = _VirtualDom_node('textarea');
var $author$project$Ajourhold$Views$ViewItems$meldingInput = F2(
	function (title, msgContent) {
		var myContent = A2($elm$core$Maybe$withDefault, '', msgContent);
		var myInput = A2(
			$elm$html$Html$textarea,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$value(myContent),
					$elm$html$Html$Events$onInput($author$project$Ajourhold$Types$MeldingChanged),
					$elm$html$Html$Attributes$class('form-control melding'),
					$elm$html$Html$Attributes$rows(3)
				]),
			_List_Nil);
		var myClazz = function () {
			if (msgContent.$ === 'Nothing') {
				return 'col-form-label missing';
			} else {
				return 'col-form-label';
			}
		}();
		return A3($author$project$Ajourhold$Views$ViewItems$formGroupItem, myClazz, title, myInput);
	});
var $author$project$Ajourhold$Views$ViewItems$message = F2(
	function (model, gpos) {
		var title = A2($author$project$Common$Misc$getLangValue, 'melding', model.lang);
		return A2(
			$author$project$Ajourhold$Views$ViewItems$gridAjourItem,
			gpos,
			A2($author$project$Ajourhold$Views$ViewItems$meldingInput, title, model.melding));
	});
var $author$project$Ajourhold$Types$ReasonCodeChanged = function (a) {
	return {$: 'ReasonCodeChanged', a: a};
};
var $elm$html$Html$select = _VirtualDom_node('select');
var $author$project$Ajourhold$Views$ViewItems$selectRow = F6(
	function (value, isMissing, isDisabled, title, mySelects, myMsg) {
		var valx = A2($elm$core$Maybe$withDefault, '-1', value);
		var mySelect = A2(
			$elm$html$Html$select,
			_List_fromArray(
				[
					$elm$html$Html$Events$onInput(myMsg),
					$elm$html$Html$Attributes$class('form-control select'),
					$elm$html$Html$Attributes$value(valx),
					$elm$html$Html$Attributes$disabled(isDisabled)
				]),
			mySelects);
		var myClazz = isMissing ? 'missing' : '';
		return A3($author$project$Ajourhold$Views$ViewItems$formGroupItem, myClazz, title, mySelect);
	});
var $elm$html$Html$option = _VirtualDom_node('option');
var $author$project$Common$ComboBox$emptySelectOption = function (title) {
	var title_ = A2($elm$core$Maybe$withDefault, '-', title);
	return A2(
		$elm$html$Html$option,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$value('-1')
			]),
		_List_fromArray(
			[
				$elm$html$Html$text(title_)
			]));
};
var $elm$html$Html$Attributes$selected = $elm$html$Html$Attributes$boolProperty('selected');
var $author$project$Common$ComboBox$selectOption = F2(
	function (selected, item) {
		if (selected.$ === 'Nothing') {
			return A2(
				$elm$html$Html$option,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$value(item.val)
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(item.txt)
					]));
		} else {
			var s = selected.a;
			return A2(
				$elm$html$Html$option,
				_List_fromArray(
					[
						$elm$html$Html$Attributes$value(item.val),
						$elm$html$Html$Attributes$selected(
						_Utils_eq(s, item.val))
					]),
				_List_fromArray(
					[
						$elm$html$Html$text(item.txt)
					]));
		}
	});
var $author$project$Ajourhold$Views$ViewItems$selectOption_ = $author$project$Common$ComboBox$selectOption($elm$core$Maybe$Nothing);
var $author$project$Ajourhold$Views$ViewItems$wrapSelectItems = F2(
	function (firstLineTitle, items) {
		var items_ = A2($elm$core$Maybe$withDefault, _List_Nil, items);
		return A2(
			$elm$core$List$cons,
			$author$project$Common$ComboBox$emptySelectOption(
				$elm$core$Maybe$Just(firstLineTitle)),
			A2($elm$core$List$map, $author$project$Ajourhold$Views$ViewItems$selectOption_, items_));
	});
var $author$project$Ajourhold$Views$ViewItems$reasons = F2(
	function (model, gpos) {
		var title = A2($author$project$Common$Misc$getLangValue, 'aarsakskoder', model.lang);
		var rc = A2($author$project$Ajourhold$Views$ViewItems$wrapSelectItems, '-------', model.reasonCodes);
		var isMissingReason = _Utils_eq(model.selectedReasonCode, $elm$core$Maybe$Nothing);
		var r = A6($author$project$Ajourhold$Views$ViewItems$selectRow, model.selectedReasonCode, isMissingReason, false, title, rc, $author$project$Ajourhold$Types$ReasonCodeChanged);
		return A2($author$project$Ajourhold$Views$ViewItems$gridAjourItem, gpos, r);
	});
var $author$project$Ajourhold$Views$ViewItems$sumHourItem = F2(
	function (title, mySumHour) {
		var mySumHour_ = A2($elm$core$Maybe$withDefault, '0.0', mySumHour);
		var myInput = A2(
			$elm$html$Html$input,
			_List_fromArray(
				[
					$elm$html$Html$Attributes$type_('number'),
					$elm$html$Html$Attributes$class('form-control time'),
					$elm$html$Html$Attributes$disabled(true),
					$elm$html$Html$Attributes$value(mySumHour_)
				]),
			_List_Nil);
		return A3($author$project$Ajourhold$Views$ViewItems$formGroupItem, 'col-form-label', title, myInput);
	});
var $author$project$Ajourhold$Views$ViewItems$sumHour = F2(
	function (model, gpos) {
		var title = A2($author$project$Common$Misc$getLangValue, 'timer', model.lang);
		return A2(
			$author$project$Ajourhold$Views$ViewItems$gridAjourItem,
			gpos,
			A2($author$project$Ajourhold$Views$ViewItems$sumHourItem, title, model.sumHours));
	});
var $author$project$Ajourhold$Views$ViewItems$toHour = F3(
	function (model, _v0, gpos) {
		var isDisabled = _v0.a;
		var title = A2($author$project$Common$Misc$getLangValue, 'til_kl', model.lang);
		var index = (model.ajcat === 2) ? 32 : 2;
		return A2(
			$author$project$Ajourhold$Views$ViewItems$gridAjourItem,
			gpos,
			A4(
				$author$project$Ajourhold$Views$ViewItems$hourItem,
				title,
				model.hourTo,
				$author$project$Ajourhold$Types$HourChanged(index),
				isDisabled));
	});
var $author$project$Ajourhold$Views$ViewItems$watch1 = F4(
	function (model, isDisabled, msg, gpos) {
		var title = (model.ajcat === 7) ? A2($author$project$Common$Misc$getLangValue, 'dekke_for', model.lang) : A2($author$project$Common$Misc$getLangValue, 'vakt', model.lang);
		var py = A2($author$project$Ajourhold$Views$ViewItems$wrapSelectItems, '-------', model.watches);
		var wp2 = A6($author$project$Ajourhold$Views$ViewItems$selectRow, model.selectedWatch, false, isDisabled, title, py, msg);
		return A2($author$project$Ajourhold$Views$ViewItems$gridAjourItem, gpos, wp2);
	});
var $author$project$Ajourhold$Views$ViewItems$workPlace1 = F3(
	function (model, msg, gpos) {
		var title = A2($author$project$Common$Misc$getLangValue, 'arbeidssted', model.lang);
		var px = A2($author$project$Ajourhold$Views$ViewItems$wrapSelectItems, '-------', model.workPlaces);
		var isMissing = _Utils_eq(model.selectedWorkPlace, $elm$core$Maybe$Nothing);
		var wp1 = A6($author$project$Ajourhold$Views$ViewItems$selectRow, model.selectedWorkPlace, isMissing, false, title, px, msg);
		return A2($author$project$Ajourhold$Views$ViewItems$gridAjourItem, gpos, wp1);
	});
var $author$project$Ajourhold$Views$Absence$view = function (model) {
	var workPlace1 = A3(
		$author$project$Ajourhold$Views$ViewItems$workPlace1,
		model,
		A2(
			$elm$core$Basics$composeL,
			$author$project$Ajourhold$Types$WatchMsgFor($author$project$Ajourhold$Types$Watch1),
			$author$project$Ajourhold$Types$Fetch),
		$author$project$Ajourhold$Views$ViewItems$gB1);
	var isDisabled = (!_Utils_eq(model.dateTo, $elm$core$Maybe$Nothing)) || $author$project$Ajourhold$Commands$isDateFromLess(model);
	var watch1 = A4(
		$author$project$Ajourhold$Views$ViewItems$watch1,
		model,
		isDisabled,
		A2(
			$elm$core$Basics$composeL,
			$author$project$Ajourhold$Types$WatchMsgFor($author$project$Ajourhold$Types$Watch1),
			$author$project$Ajourhold$Types$Changed),
		$author$project$Ajourhold$Views$ViewItems$gB2);
	var date2 = A3(
		$author$project$Ajourhold$Views$ViewItems$dateTo,
		model,
		A2(
			$elm$core$Basics$composeL,
			$author$project$Ajourhold$Types$WatchMsgFor($author$project$Ajourhold$Types$Watch1),
			$author$project$Ajourhold$Types$DateChanged(2)),
		$author$project$Ajourhold$Views$ViewItems$gA2);
	var date1 = A2(
		$author$project$Ajourhold$Views$ViewItems$dateFrom,
		model,
		A2(
			$elm$core$Basics$composeL,
			$author$project$Ajourhold$Types$WatchMsgFor($author$project$Ajourhold$Types$Watch1),
			$author$project$Ajourhold$Types$DateChanged(1)));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('grid-ajour-cells')
			]),
		_List_fromArray(
			[
				date1,
				date2,
				watch1,
				workPlace1,
				A3(
				$author$project$Ajourhold$Views$ViewItems$fromHour,
				model,
				$author$project$Ajourhold$Types$IsDisabled(false),
				$author$project$Ajourhold$Views$ViewItems$gC1),
				A3(
				$author$project$Ajourhold$Views$ViewItems$toHour,
				model,
				$author$project$Ajourhold$Types$IsDisabled(false),
				$author$project$Ajourhold$Views$ViewItems$gC2),
				A2($author$project$Ajourhold$Views$ViewItems$sumHour, model, $author$project$Ajourhold$Views$ViewItems$gC3),
				$author$project$Ajourhold$Views$ViewItems$hourBankBalance(model),
				A2($author$project$Ajourhold$Views$ViewItems$reasons, model, $author$project$Ajourhold$Views$ViewItems$gE1),
				A2($author$project$Ajourhold$Views$ViewItems$message, model, $author$project$Ajourhold$Views$ViewItems$gE23),
				A2($author$project$Ajourhold$Views$ViewItems$btn, model, $author$project$Ajourhold$Views$ViewItems$gF1),
				A2($author$project$Common$ModalDialog$alert, model.dlgAlert, $author$project$Ajourhold$Types$AlertOk)
			]));
};
var $author$project$Ajourhold$Types$Emergency = {$: 'Emergency'};
var $author$project$Ajourhold$Types$ToTimeBankChanged = function (a) {
	return {$: 'ToTimeBankChanged', a: a};
};
var $author$project$Ajourhold$Views$ViewItems$gD1 = $author$project$Ajourhold$Types$GridPosition('grid-ajour-d1');
var $author$project$Ajourhold$Views$ViewItems$toHourBank = function (model) {
	var title = A2($author$project$Common$Misc$getLangValue, 'til_timebank', model.lang);
	var myToTimeBank = A2($elm$core$Maybe$withDefault, '0.00', model.toTimeBank);
	var tilTimebankInput = A5(
		$author$project$Ajourhold$Views$ViewItems$inputItem,
		'number',
		myToTimeBank,
		'form-control timebank',
		$elm$core$Maybe$Just($author$project$Ajourhold$Types$ToTimeBankChanged),
		false);
	var ttb = A3($author$project$Ajourhold$Views$ViewItems$formGroupItem, 'col-form-label', title, tilTimebankInput);
	return A2($author$project$Ajourhold$Views$ViewItems$gridAjourItem, $author$project$Ajourhold$Views$ViewItems$gD1, ttb);
};
var $author$project$Ajourhold$Views$Emergency$view = function (model) {
	var workPlace1 = A3(
		$author$project$Ajourhold$Views$ViewItems$workPlace1,
		model,
		A2(
			$elm$core$Basics$composeL,
			$author$project$Ajourhold$Types$WatchMsgFor($author$project$Ajourhold$Types$Emergency),
			$author$project$Ajourhold$Types$Fetch),
		$author$project$Ajourhold$Views$ViewItems$gB1);
	var watch1 = A4(
		$author$project$Ajourhold$Views$ViewItems$watch1,
		model,
		false,
		A2(
			$elm$core$Basics$composeL,
			$author$project$Ajourhold$Types$WatchMsgFor($author$project$Ajourhold$Types$Emergency),
			$author$project$Ajourhold$Types$Changed),
		$author$project$Ajourhold$Views$ViewItems$gB2);
	var date1 = A2(
		$author$project$Ajourhold$Views$ViewItems$dateFrom,
		model,
		A2(
			$elm$core$Basics$composeL,
			$author$project$Ajourhold$Types$WatchMsgFor($author$project$Ajourhold$Types$Emergency),
			$author$project$Ajourhold$Types$DateChanged(1)));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('grid-ajour-cells')
			]),
		_List_fromArray(
			[
				date1,
				workPlace1,
				watch1,
				A3(
				$author$project$Ajourhold$Views$ViewItems$fromHour,
				model,
				$author$project$Ajourhold$Types$IsDisabled(false),
				$author$project$Ajourhold$Views$ViewItems$gC1),
				A3(
				$author$project$Ajourhold$Views$ViewItems$toHour,
				model,
				$author$project$Ajourhold$Types$IsDisabled(false),
				$author$project$Ajourhold$Views$ViewItems$gC2),
				A2($author$project$Ajourhold$Views$ViewItems$sumHour, model, $author$project$Ajourhold$Views$ViewItems$gC3),
				$author$project$Ajourhold$Views$ViewItems$toHourBank(model),
				$author$project$Ajourhold$Views$ViewItems$hourBankBalance(model),
				A2($author$project$Ajourhold$Views$ViewItems$reasons, model, $author$project$Ajourhold$Views$ViewItems$gE1),
				A2($author$project$Ajourhold$Views$ViewItems$message, model, $author$project$Ajourhold$Views$ViewItems$gE23),
				A2($author$project$Ajourhold$Views$ViewItems$btn, model, $author$project$Ajourhold$Views$ViewItems$gF1),
				A2($author$project$Common$ModalDialog$alert, model.dlgAlert, $author$project$Ajourhold$Types$AlertOk)
			]));
};
var $author$project$Ajourhold$Views$Extra$view = function (model) {
	var workPlace1 = A3(
		$author$project$Ajourhold$Views$ViewItems$workPlace1,
		model,
		A2(
			$elm$core$Basics$composeL,
			$author$project$Ajourhold$Types$WatchMsgFor($author$project$Ajourhold$Types$CoverFor),
			$author$project$Ajourhold$Types$Fetch),
		$author$project$Ajourhold$Views$ViewItems$gB1);
	var watch1 = A4(
		$author$project$Ajourhold$Views$ViewItems$watch1,
		model,
		false,
		A2(
			$elm$core$Basics$composeL,
			$author$project$Ajourhold$Types$WatchMsgFor($author$project$Ajourhold$Types$CoverFor),
			$author$project$Ajourhold$Types$Changed),
		$author$project$Ajourhold$Views$ViewItems$gB2);
	var date1 = A2(
		$author$project$Ajourhold$Views$ViewItems$dateFrom,
		model,
		A2(
			$elm$core$Basics$composeL,
			$author$project$Ajourhold$Types$WatchMsgFor($author$project$Ajourhold$Types$CoverFor),
			$author$project$Ajourhold$Types$DateChanged(1)));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('grid-ajour-cells')
			]),
		_List_fromArray(
			[
				date1,
				workPlace1,
				watch1,
				A3(
				$author$project$Ajourhold$Views$ViewItems$fromHour,
				model,
				$author$project$Ajourhold$Types$IsDisabled(false),
				$author$project$Ajourhold$Views$ViewItems$gC1),
				A3(
				$author$project$Ajourhold$Views$ViewItems$toHour,
				model,
				$author$project$Ajourhold$Types$IsDisabled(false),
				$author$project$Ajourhold$Views$ViewItems$gC2),
				A2($author$project$Ajourhold$Views$ViewItems$sumHour, model, $author$project$Ajourhold$Views$ViewItems$gC3),
				$author$project$Ajourhold$Views$ViewItems$toHourBank(model),
				$author$project$Ajourhold$Views$ViewItems$hourBankBalance(model),
				A2($author$project$Ajourhold$Views$ViewItems$reasons, model, $author$project$Ajourhold$Views$ViewItems$gE1),
				A2($author$project$Ajourhold$Views$ViewItems$message, model, $author$project$Ajourhold$Views$ViewItems$gE23),
				A2($author$project$Ajourhold$Views$ViewItems$btn, model, $author$project$Ajourhold$Views$ViewItems$gF1),
				A2($author$project$Common$ModalDialog$alert, model.dlgAlert, $author$project$Ajourhold$Types$AlertOk)
			]));
};
var $author$project$Ajourhold$Types$SimpleDateChanged = F2(
	function (a, b) {
		return {$: 'SimpleDateChanged', a: a, b: b};
	});
var $author$project$Ajourhold$Types$WorkPlaceChanged = function (a) {
	return {$: 'WorkPlaceChanged', a: a};
};
var $author$project$Ajourhold$Views$ViewItems$gD23 = $author$project$Ajourhold$Types$GridPosition('grid-ajour-d23');
var $author$project$Ajourhold$Views$GeneralAddition$view = function (model) {
	var workPlace1 = A3($author$project$Ajourhold$Views$ViewItems$workPlace1, model, $author$project$Ajourhold$Types$WorkPlaceChanged, $author$project$Ajourhold$Views$ViewItems$gB1);
	var to_date_str = A2($author$project$Common$Misc$getLangValue, 'til_dato', model.lang);
	var from_date_str = A2($author$project$Common$Misc$getLangValue, 'fra_dato', model.lang);
	var date2 = A2(
		$author$project$Ajourhold$Views$ViewItems$gridAjourItem,
		$author$project$Ajourhold$Views$ViewItems$gA2,
		A3(
			$author$project$Ajourhold$Views$ViewItems$dateItem,
			to_date_str,
			model.dateTo,
			$author$project$Ajourhold$Types$SimpleDateChanged(2)));
	var date1 = A2(
		$author$project$Ajourhold$Views$ViewItems$gridAjourItem,
		$author$project$Ajourhold$Views$ViewItems$gA1,
		A3(
			$author$project$Ajourhold$Views$ViewItems$dateItem,
			from_date_str,
			model.dateFrom,
			$author$project$Ajourhold$Types$SimpleDateChanged(1)));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('grid-ajour-cells')
			]),
		_List_fromArray(
			[
				date1,
				date2,
				workPlace1,
				A3(
				$author$project$Ajourhold$Views$ViewItems$fromHour,
				model,
				$author$project$Ajourhold$Types$IsDisabled(false),
				$author$project$Ajourhold$Views$ViewItems$gC1),
				A3(
				$author$project$Ajourhold$Views$ViewItems$toHour,
				model,
				$author$project$Ajourhold$Types$IsDisabled(false),
				$author$project$Ajourhold$Views$ViewItems$gC2),
				A2($author$project$Ajourhold$Views$ViewItems$sumHour, model, $author$project$Ajourhold$Views$ViewItems$gC3),
				A2($author$project$Ajourhold$Views$ViewItems$reasons, model, $author$project$Ajourhold$Views$ViewItems$gD1),
				A2($author$project$Ajourhold$Views$ViewItems$message, model, $author$project$Ajourhold$Views$ViewItems$gD23),
				A2($author$project$Ajourhold$Views$ViewItems$btn, model, $author$project$Ajourhold$Views$ViewItems$gE1),
				A2($author$project$Common$ModalDialog$alert, model.dlgAlert, $author$project$Ajourhold$Types$AlertOk)
			]));
};
var $author$project$Ajourhold$Types$SlideDateChanged = F2(
	function (a, b) {
		return {$: 'SlideDateChanged', a: a, b: b};
	});
var $author$project$Ajourhold$Types$SlideWatchChanged = F2(
	function (a, b) {
		return {$: 'SlideWatchChanged', a: a, b: b};
	});
var $author$project$Ajourhold$Types$SlideWorkPlaceChanged = F2(
	function (a, b) {
		return {$: 'SlideWorkPlaceChanged', a: a, b: b};
	});
var $author$project$Ajourhold$Views$ViewItems$fromHour2 = F3(
	function (model, _v0, gpos) {
		var isDisabled = _v0.a;
		var title = A2($author$project$Common$Misc$getLangValue, 'fra_kl', model.lang);
		return A2(
			$author$project$Ajourhold$Views$ViewItems$gridAjourItem,
			gpos,
			A4(
				$author$project$Ajourhold$Views$ViewItems$hourItem,
				title,
				model.hourFrom2,
				$author$project$Ajourhold$Types$HourChanged(21),
				isDisabled));
	});
var $author$project$Ajourhold$Views$ViewItems$gA3 = $author$project$Ajourhold$Types$GridPosition('grid-ajour-a3');
var $author$project$Ajourhold$Views$ViewItems$gB3 = $author$project$Ajourhold$Types$GridPosition('grid-ajour-b3');
var $author$project$Ajourhold$Views$ViewItems$gD3 = $author$project$Ajourhold$Types$GridPosition('grid-ajour-d3');
var $author$project$Ajourhold$Views$ViewItems$sumHour2 = F2(
	function (model, gpos) {
		var title = A2($author$project$Common$Misc$getLangValue, 'timer', model.lang);
		return A2(
			$author$project$Ajourhold$Views$ViewItems$gridAjourItem,
			gpos,
			A2($author$project$Ajourhold$Views$ViewItems$sumHourItem, title, model.sumHours2));
	});
var $author$project$Ajourhold$Views$ViewItems$toHour2 = F3(
	function (model, _v0, gpos) {
		var isDisabled = _v0.a;
		var title = A2($author$project$Common$Misc$getLangValue, 'til_kl', model.lang);
		return A2(
			$author$project$Ajourhold$Views$ViewItems$gridAjourItem,
			gpos,
			A4(
				$author$project$Ajourhold$Views$ViewItems$hourItem,
				title,
				model.hourTo2,
				$author$project$Ajourhold$Types$HourChanged(22),
				isDisabled));
	});
var $author$project$Ajourhold$Views$ViewItems$watch2 = F4(
	function (model, isDisabled, msg, gpos) {
		var title = A2($author$project$Common$Misc$getLangValue, 'vakt', model.lang);
		var py = A2($author$project$Ajourhold$Views$ViewItems$wrapSelectItems, '-------', model.watches2);
		var w2 = A6($author$project$Ajourhold$Views$ViewItems$selectRow, model.selectedWatch2, false, isDisabled, title, py, msg);
		return A2($author$project$Ajourhold$Views$ViewItems$gridAjourItem, gpos, w2);
	});
var $author$project$Ajourhold$Views$ViewItems$workPlace2 = F3(
	function (model, msg, gpos) {
		var title = A2($author$project$Common$Misc$getLangValue, 'arbeidssted', model.lang);
		var px = A2($author$project$Ajourhold$Views$ViewItems$wrapSelectItems, '-------', model.workPlaces);
		var isMissing = _Utils_eq(model.selectedWorkPlace, $elm$core$Maybe$Nothing);
		var wp2 = A6($author$project$Ajourhold$Views$ViewItems$selectRow, model.selectedWorkPlace2, isMissing, false, title, px, msg);
		return A2($author$project$Ajourhold$Views$ViewItems$gridAjourItem, gpos, wp2);
	});
var $author$project$Ajourhold$Views$Slide$view = function (model) {
	var workPlace2 = A3(
		$author$project$Ajourhold$Views$ViewItems$workPlace2,
		model,
		A2(
			$elm$core$Basics$composeL,
			$author$project$Ajourhold$Types$SlideMsgFor,
			$author$project$Ajourhold$Types$SlideWorkPlaceChanged(22)),
		$author$project$Ajourhold$Views$ViewItems$gC2);
	var workPlace1 = A3(
		$author$project$Ajourhold$Views$ViewItems$workPlace1,
		model,
		A2(
			$elm$core$Basics$composeL,
			$author$project$Ajourhold$Types$SlideMsgFor,
			$author$project$Ajourhold$Types$SlideWorkPlaceChanged(1)),
		$author$project$Ajourhold$Views$ViewItems$gA2);
	var watch2 = A4(
		$author$project$Ajourhold$Views$ViewItems$watch2,
		model,
		false,
		A2(
			$elm$core$Basics$composeL,
			$author$project$Ajourhold$Types$SlideMsgFor,
			$author$project$Ajourhold$Types$SlideWatchChanged(2)),
		$author$project$Ajourhold$Views$ViewItems$gC3);
	var watch1 = A4(
		$author$project$Ajourhold$Views$ViewItems$watch1,
		model,
		false,
		A2(
			$elm$core$Basics$composeL,
			$author$project$Ajourhold$Types$SlideMsgFor,
			$author$project$Ajourhold$Types$SlideWatchChanged(1)),
		$author$project$Ajourhold$Views$ViewItems$gA3);
	var date2 = A3(
		$author$project$Ajourhold$Views$ViewItems$dateTo,
		model,
		A2(
			$elm$core$Basics$composeL,
			$author$project$Ajourhold$Types$SlideMsgFor,
			$author$project$Ajourhold$Types$SlideDateChanged(21)),
		$author$project$Ajourhold$Views$ViewItems$gC1);
	var date1 = A2(
		$author$project$Ajourhold$Views$ViewItems$dateFrom,
		model,
		A2(
			$elm$core$Basics$composeL,
			$author$project$Ajourhold$Types$SlideMsgFor,
			$author$project$Ajourhold$Types$SlideDateChanged(1)));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('grid-ajour-cells')
			]),
		_List_fromArray(
			[
				date1,
				workPlace1,
				watch1,
				A3(
				$author$project$Ajourhold$Views$ViewItems$fromHour,
				model,
				$author$project$Ajourhold$Types$IsDisabled(true),
				$author$project$Ajourhold$Views$ViewItems$gB1),
				A3(
				$author$project$Ajourhold$Views$ViewItems$toHour,
				model,
				$author$project$Ajourhold$Types$IsDisabled(true),
				$author$project$Ajourhold$Views$ViewItems$gB2),
				A2($author$project$Ajourhold$Views$ViewItems$sumHour, model, $author$project$Ajourhold$Views$ViewItems$gB3),
				date2,
				workPlace2,
				watch2,
				A3(
				$author$project$Ajourhold$Views$ViewItems$fromHour2,
				model,
				$author$project$Ajourhold$Types$IsDisabled(false),
				$author$project$Ajourhold$Views$ViewItems$gD1),
				A3(
				$author$project$Ajourhold$Views$ViewItems$toHour2,
				model,
				$author$project$Ajourhold$Types$IsDisabled(false),
				$author$project$Ajourhold$Views$ViewItems$gD2),
				A2($author$project$Ajourhold$Views$ViewItems$sumHour2, model, $author$project$Ajourhold$Views$ViewItems$gD3),
				A2($author$project$Ajourhold$Views$ViewItems$reasons, model, $author$project$Ajourhold$Views$ViewItems$gE1),
				A2($author$project$Ajourhold$Views$ViewItems$message, model, $author$project$Ajourhold$Views$ViewItems$gE23),
				A2($author$project$Ajourhold$Views$ViewItems$btn, model, $author$project$Ajourhold$Views$ViewItems$gF1),
				A2($author$project$Common$ModalDialog$alert, model.dlgAlert, $author$project$Ajourhold$Types$AlertOk)
			]));
};
var $author$project$Ajourhold$Views$Swap$view = function (model) {
	var workPlace2 = A3(
		$author$project$Ajourhold$Views$ViewItems$workPlace2,
		model,
		A2(
			$elm$core$Basics$composeL,
			$author$project$Ajourhold$Types$WatchMsgFor(
				$author$project$Ajourhold$Types$Swap(2)),
			$author$project$Ajourhold$Types$Fetch),
		$author$project$Ajourhold$Views$ViewItems$gD1);
	var workPlace1 = A3(
		$author$project$Ajourhold$Views$ViewItems$workPlace1,
		model,
		A2(
			$elm$core$Basics$composeL,
			$author$project$Ajourhold$Types$WatchMsgFor(
				$author$project$Ajourhold$Types$Swap(1)),
			$author$project$Ajourhold$Types$Fetch),
		$author$project$Ajourhold$Views$ViewItems$gB1);
	var watch2 = A4(
		$author$project$Ajourhold$Views$ViewItems$watch2,
		model,
		false,
		A2(
			$elm$core$Basics$composeL,
			$author$project$Ajourhold$Types$WatchMsgFor(
				$author$project$Ajourhold$Types$Swap(2)),
			$author$project$Ajourhold$Types$Changed),
		$author$project$Ajourhold$Views$ViewItems$gD2);
	var watch1 = A4(
		$author$project$Ajourhold$Views$ViewItems$watch1,
		model,
		false,
		A2(
			$elm$core$Basics$composeL,
			$author$project$Ajourhold$Types$WatchMsgFor(
				$author$project$Ajourhold$Types$Swap(1)),
			$author$project$Ajourhold$Types$Changed),
		$author$project$Ajourhold$Views$ViewItems$gB2);
	var date2 = A3(
		$author$project$Ajourhold$Views$ViewItems$dateTo,
		model,
		A2(
			$elm$core$Basics$composeL,
			$author$project$Ajourhold$Types$WatchMsgFor(
				$author$project$Ajourhold$Types$Swap(2)),
			$author$project$Ajourhold$Types$DateChanged(1)),
		$author$project$Ajourhold$Views$ViewItems$gC1);
	var date1 = A2(
		$author$project$Ajourhold$Views$ViewItems$dateFrom,
		model,
		A2(
			$elm$core$Basics$composeL,
			$author$project$Ajourhold$Types$WatchMsgFor(
				$author$project$Ajourhold$Types$Swap(1)),
			$author$project$Ajourhold$Types$DateChanged(1)));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('grid-ajour-cells')
			]),
		_List_fromArray(
			[
				date1,
				workPlace1,
				watch1,
				date2,
				workPlace2,
				watch2,
				A2($author$project$Ajourhold$Views$ViewItems$message, model, $author$project$Ajourhold$Views$ViewItems$gE23),
				A2($author$project$Ajourhold$Views$ViewItems$btn, model, $author$project$Ajourhold$Views$ViewItems$gE1),
				A2($author$project$Common$ModalDialog$alert, model.dlgAlert, $author$project$Ajourhold$Types$AlertOk)
			]));
};
var $author$project$Ajourhold$Views$Timeoff$view = function (model) {
	return $author$project$Ajourhold$Views$Absence$view(model);
};
var $author$project$Ajourhold$Views$Vacation$view = function (model) {
	var workPlace1 = A3($author$project$Ajourhold$Views$ViewItems$workPlace1, model, $author$project$Ajourhold$Types$WorkPlaceChanged, $author$project$Ajourhold$Views$ViewItems$gB1);
	var vacationInput = A5($author$project$Ajourhold$Views$ViewItems$inputItem, 'string', model.vacation, 'form-control', $elm$core$Maybe$Nothing, true);
	var to_date_str = A2($author$project$Common$Misc$getLangValue, 'til_dato', model.lang);
	var from_date_str = A2($author$project$Common$Misc$getLangValue, 'fra_dato', model.lang);
	var ferie_tilgode_str = A2($author$project$Common$Misc$getLangValue, 'ferie_tilgode', model.lang);
	var vacation = A2(
		$author$project$Ajourhold$Views$ViewItems$gridAjourItem,
		$author$project$Ajourhold$Views$ViewItems$gC1,
		A3($author$project$Ajourhold$Views$ViewItems$formGroupItem, 'col-form-label', ferie_tilgode_str, vacationInput));
	var date2 = A2(
		$author$project$Ajourhold$Views$ViewItems$gridAjourItem,
		$author$project$Ajourhold$Views$ViewItems$gA2,
		A3(
			$author$project$Ajourhold$Views$ViewItems$dateItem,
			to_date_str,
			model.dateTo,
			$author$project$Ajourhold$Types$SimpleDateChanged(2)));
	var date1 = A2(
		$author$project$Ajourhold$Views$ViewItems$gridAjourItem,
		$author$project$Ajourhold$Views$ViewItems$gA1,
		A3(
			$author$project$Ajourhold$Views$ViewItems$dateItem,
			from_date_str,
			model.dateFrom,
			$author$project$Ajourhold$Types$SimpleDateChanged(1)));
	return A2(
		$elm$html$Html$div,
		_List_fromArray(
			[
				$elm$html$Html$Attributes$class('grid-ajour-cells')
			]),
		_List_fromArray(
			[
				date1,
				date2,
				workPlace1,
				vacation,
				A2($author$project$Ajourhold$Views$ViewItems$reasons, model, $author$project$Ajourhold$Views$ViewItems$gD1),
				A2($author$project$Ajourhold$Views$ViewItems$message, model, $author$project$Ajourhold$Views$ViewItems$gD23),
				A2($author$project$Ajourhold$Views$ViewItems$btn, model, $author$project$Ajourhold$Views$ViewItems$gE1),
				A2($author$project$Common$ModalDialog$alert, model.dlgAlert, $author$project$Ajourhold$Types$AlertOk)
			]));
};
var $author$project$Ajourhold$View$view = function (model) {
	var _v0 = model.ajcat;
	switch (_v0) {
		case 7:
			return $author$project$Ajourhold$Views$Extra$view(model);
		case 2:
			return $author$project$Ajourhold$Views$Emergency$view(model);
		case 6:
			return $author$project$Ajourhold$Views$Absence$view(model);
		case 1:
			return $author$project$Ajourhold$Views$Timeoff$view(model);
		case 18:
			return $author$project$Ajourhold$Views$Vacation$view(model);
		case 3:
			return $author$project$Ajourhold$Views$Swap$view(model);
		case 15:
			return $author$project$Ajourhold$Views$Slide$view(model);
		default:
			return $author$project$Ajourhold$Views$GeneralAddition$view(model);
	}
};
var $author$project$Ajourhold$Requests$main = $elm$browser$Browser$element(
	{init: $author$project$Ajourhold$Requests$init, subscriptions: $author$project$Ajourhold$Requests$subscriptions, update: $author$project$Ajourhold$Update$update, view: $author$project$Ajourhold$View$view});
_Platform_export({'Ajourhold':{'Requests':{'init':$author$project$Ajourhold$Requests$main(
	A2(
		$elm$json$Json$Decode$andThen,
		function (mainurl) {
			return A2(
				$elm$json$Json$Decode$andThen,
				function (lang) {
					return A2(
						$elm$json$Json$Decode$andThen,
						function (ajcat) {
							return $elm$json$Json$Decode$succeed(
								{ajcat: ajcat, lang: lang, mainurl: mainurl});
						},
						A2($elm$json$Json$Decode$field, 'ajcat', $elm$json$Json$Decode$int));
				},
				A2($elm$json$Json$Decode$field, 'lang', $elm$json$Json$Decode$value));
		},
		A2($elm$json$Json$Decode$field, 'mainurl', $elm$json$Json$Decode$string)))(0)}}});}(this));