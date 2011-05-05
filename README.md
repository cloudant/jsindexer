# jsindexer

jsindexer is an example javascript view that creates an inverted index needed to do full text search on a CouchApp or CouchDB database hosted on cloudant.com.  This is an alternative to the Java/Lucene indexers used by default.

## Requirements

cloudant hosted account (sign up at <https://cloudant.com/#!/solutions/cloud>), couchapp

## Install

<pre><code>cd jsindexer
cat > .couchapprc
{"env":{"default":{"db":"http://&lt;user&gt;:&lt;pass&gt;@&lt;user&gt;.cloudant.com:5984/&lt;db_or_couchapp_you_want_to_search&gt;"}}}
^C</code></pre>

*that last line means hit **CTRL-C***

To configure the indexing of documents, modify the file:

views/whitespace/map.js

Cloudant search expects key,value pairs with the following format:

<pre><code>emit([field,token],[[1,6,8]]);</code></pre>

where 1,6,8 are the positions of that token in the field.  The positions enable phrase searches.

<pre><code>couchapp push</code></pre>

Now trigger indexing with:

<pre><code>http://&lt;user&gt;.cloudant.com:5984/&lt;db_or_couchapp_you_want_to_search&gt;/_design/jsindexer/_view/whitespace</code></pre>

Once indexing is done, you can use the regular search syntax (<http://support.cloudant.com/kb/search/search-api>), but yon need to specify the index:

<pre><code>http://&lt;user&gt;.cloudant.com:5984/&lt;db_or_couchapp_you_want_to_search&gt;/_search?q=myfield:"some phrase"&index=_design/jsindexer/_view/whitespace</code></pre>

