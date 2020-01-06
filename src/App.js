import React from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';

import Home from './screens/Home';
import Detail from './screens/Detail';

function App() {
  return (
    <Router>
      <Stack key='root'>
        <Scene key='home' component={Home} title='Home' hideNavBar={true} />
        <Scene key='detail' component={Detail} title='Detail' />
      </Stack>
    </Router>
  );
}

export default App;
