import Init from './init';
import { Providers } from './src/context';

export default function App() {

    return (
        <Providers>  {/* ISSUE: THIS PROVIDER IS RERENDERING THE APP THREE TIMES */}
            <Init/>
        </Providers>
    );
}