define(['step'],
    function(Step) {
        // This abstracts the connection pooling and error handling which all
        // the requests are doing.  'query' is called once the connection is
        // received. 'onResult' is called when the query has returned.
        // Additional arguments are run afterwards.
        return function (pool, query, onResult) {
            var funs = [
                function openConn() {
                    pool.getConnection(this);
                },
                function withConn(err, connection) {
                    if (err) {
                        console.log(err)
                        throw new Error
                    }
                    query.call(this, connection)
                },
                function queryDone(err, result) {
                    if (err) {
                        console.log('error', err)
                        throw new Error
                    }
                    onResult.call(this, result)
                }
            ]
            Step.apply(null, funs.concat(Array.prototype.slice.call(arguments, 2)))
        }
    }
)