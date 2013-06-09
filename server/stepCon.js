define(['step'],
    function(Step) {
        // This abstracts connection pooling and error handling for
        // asynchronous sequences of functions.  'query' is called
        // once the connection is received. 'onResult' is called when
        // the query has returned.  Additional arguments are run
        // afterwards as functions in the step sequence.
        return function (pool, query, onResult) {
            var funs = [
                function openConn() {
                    pool.getConnection(this);
                },
                function withConn(err, connection) {
                    if (err) throw err
                    query.call(this, connection)
                },
                function queryDone(err, result) {
                    if (err) throw err
                    onResult.call(this, result)
                }
            ]
            Step.apply(null, funs.concat(Array.prototype.slice.call(arguments, 2)))
        }
    }
)