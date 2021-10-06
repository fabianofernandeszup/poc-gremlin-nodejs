const gremlin = require('gremlin');
const readline = require('readline');

const DriverRemoteConnection = gremlin.driver.DriverRemoteConnection;
const Graph = gremlin.structure.Graph;
const { both, out, outE, outV, in_, inV, inE, hasLabel } = gremlin.process.statics;
dc = new DriverRemoteConnection('wss://localhost:8182/gremlin',{});
const graph = new Graph();
const g = graph.traversal().withRemote(dc);


let idTenant = 'ori::tenant::test::aa683b79-a175-412c-9444-7c975dbd6f6a'
// let idGroup = 'ori::group::test::0e8c927b-205a-418f-9726-e54a0391c090'
let idFinal = 'ori::group::test::ff129825-6068-4081-a475-9d599ed77c91'

/**
 * Selects
 */

// g.V(idGroup).in_().hasLabel('group') // descer um elemento
// g.V().has('name', 'Portal') // todos vertives com nome Portal
// g.V(idTenant).out().out().out().hasLabel('group') // descer três vezes e pegar o elemento do tipo group
// g.V(idGroup).in_().in_().in_().hasLabel('tenant') // subir trez niveis e pegar o elemento do tipo tenant
// g.V(idGroup).both().both() // pegar elementos nos dois sentidos
// g.V(idGroup).repeat(in_()).times(3) // repetir in_ 3x
// g.V(idTenant).until(hasLabel('tenant')).repeat(in_('owns')) //primeiro tenant acima, considerando o item atual
// g.V(idTenant).repeat(in_('owns')).until(hasLabel('tenant')) //primeiro tenant acima, sem considerar o item atual
// g.V('ori::product::1e8bbcf4-0fac-40f6-aedf-ee655e222831::8e586e80-0aa3-4dcd-a3b9-718a6ecafd6c').until(hasLabel('tenant')).repeat(in_('owns')) //primeiro tenant acima, considerando o item atual
// g.V(idGroup).in_().until(hasLabel('group')).repeat(in_()) // primeiro grupo acima
// g.V(idGroup).repeat(in_()).times(1).emit().path().by('name') // repetir in_ por 1x
// g.V().tree() // todos elementos
// g.V(idGroup).repeat(in_()).until(inE().count().is(0)).path().by('name')
// g.V(idGroup).repeat(in_()).until(inE().count().is(0)).path() // primeiro elemento da do grapho
// g.V(idGroup).repeat(in_()).until(inE().count().is(0)).repeat(out()).until(hasLabel('group')) // primeiro elemento do grapho do tipo 'group'
// g.V(idGroup).repeat(in_()).until(hasLabel('tenant')).out() // primeiro elemento abaixo de tenant
g.V('ori::resource::9e8578c5-fe3b-4db3-affa-a3dcf02af025::ba5d81a2-5040-402a-801e-0c09b79328b9') // mostra um recurso
.valueMap()
.next()
.then(data => {
    console.log(data);
    dc.close();
}).catch(error => {
console.log('ERROR', error);
dc.close();
});


/**
 * Delete
 */
// g.V('ori::tenant::test::aa683b79-a175-412c-9444-7c975dbd6f6a').out().hasLabel('group').drop().iterate() // deleta todos abaixo, com o label grup
// g.V('ori::group::4a1fb966-4795-4d24-aa37-1f1aad7bd2b1::5e340be2-55b3-47a7-9a68-5caebf24acb1').out().hasLabel('template').drop().iterate() // deleta todos abaixo, com o label grup
// g.V().hasLabel('template').drop().iterate() // deleta todos do label template
// g.V('ori::resource::9e8578c5-fe3b-4db3-affa-a3dcf02af025::ba5d81a2-5040-402a-801e-0c09b79328b9') // deletar um recurso
// .then(data => {
//     console.log(data);
//     dc.close();
// }).catch(error => {
//     console.log('ERROR', error);
//     dc.close();
// });
