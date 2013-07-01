define(['step'],
    function(Step) {
        // This abstracts connection pooling and error handling for
        // asynchronous sequences of functions.  'query' is called
        // once the connection has been opened. 'onResult' is called
        // when the query has returned.  Additional arguments (4th and
        // beyond) are then run. Finally, the connection is properly
        // disposed. Any error that occurs in opening the connection
        // or running the queries will be thrown out of the step
        // sequence. NOTE Additional functions (4th arg and beyond)
        // must propagate errors themselves as normal step functions.
        return function (pool, query, onResult) {
            var funs = [
                function openConn() {
                    pool.getConnection(this);
                },
                function withConn(err, connection) {
                    if (err) throw err
                    this.conn = connection
                    query.call(this, connection)
                },
                function queryDone(err, result) {
                    if (err) throw err
                    onResult.call(this, result)
                }
            ]
            var end = function(err) {
                this.conn.end()
                if (err) throw err
            }
            // These functions should manually propagate errors thrown
            // by previous steps.
            var additional = Array.prototype.slice.call(arguments, 3)
            Step.apply(null, funs.concat(additional, end))
        }
    }
)