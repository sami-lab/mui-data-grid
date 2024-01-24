import logo from './logo.svg';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import the theme you just created
import AgentGrid from './AgentGrid'; // Adjust the path as necessary
import {Box, Typography} from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <AgentGrid />
        </header>
           <Box>
                <Typography variant="h6" component="h6"> Your information was successfully registered. </Typography>
           </Box>
      </div>
    </ThemeProvider>
  );
}

export default App;
