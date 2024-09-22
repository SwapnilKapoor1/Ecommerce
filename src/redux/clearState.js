import { persistor } from './store'

function clearPersist(){
    persistor.purge()
}
export default clearPersist();