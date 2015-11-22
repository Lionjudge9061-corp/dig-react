/* eslint no-console:0 */
import { oassign } from '../unicorns';

class Env {

  set(opts) {
    oassign(this,opts);
  }

  get(name) {
    return this[name];
  }

  log() {
    if( this.debugMode ) {
      console.log(...arguments);
    }
  }

  assert( truthyTest, msg ) {
    if( this.debugMode ) {
      if( !truthyTest ) {
        console.error('ASSERT FAILED', msg);
      }
    }
  }
}


module.exports = new Env();

