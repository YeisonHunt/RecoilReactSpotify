import { useRecoilTransactionObserver_UNSTABLE } from 'recoil'
import { spotifyRefreshToken, spotifyTokenResponse } from '../recoil/auth/atoms'
export default function DebugObserver(){

    useRecoilTransactionObserver_UNSTABLE(({snapshot})=>{

        //TODO persistir la informacion
        for (const modifiedAtom of snapshot.getNodes_UNSTABLE({ isModified:true })){
            const atom = snapshot.getLoadable(modifiedAtom).contents
        }

    })
    return null;
}