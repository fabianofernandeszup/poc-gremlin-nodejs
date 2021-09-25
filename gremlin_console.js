const gremlin = require('gremlin');
const readline = require('readline');

const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const { both, out, outE, outV, in_, inV, inE, hasLabel } = gremlin.process.statics;
dc = new DriverRemoteConnection('wss://localhost:8182/gremlin',{});
const graph = new Graph();
const g = graph.traversal().withRemote(dc);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = () => {
    rl.question('gremlin> ', (comand) => {
        console.log(`Running: ${comand}`);
        if (comand !== 'exit') {
            try {
                eval(comand).next().
                    then(data => {
                        console.log(data);
                        dc.close();
                        question()
                    }).catch(error => {
                        console.log('ERROR', error);
                        dc.close();
                        question();
                    });
            } catch (e) {
                console.log('ERROR', e);
                dc.close();
                question();
            }
        } else {
            rl.close();
            process.exit(0);
        }
    });
}
question()