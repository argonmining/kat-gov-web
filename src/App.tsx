import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DarkModeProvider } from './context/DarkModeContext';
import Home from './pages/Home';
import Proposals from './pages/Proposals';
import ProposalDetail from './pages/ProposalDetail';
import Elections from './pages/Elections';
import ElectionDetail from './pages/ElectionDetail';
import Treasury from './pages/Treasury';
import SubmitProposal from './pages/SubmitProposal';
import Management from './pages/Management';

const App: React.FC = () => (
  <DarkModeProvider>
    <div className="bg-white dark:bg-gray-900">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proposals" element={<Proposals />} />
          <Route path="/proposals/:id" element={<ProposalDetail />} />
          <Route path="/elections" element={<Elections />} />
          <Route path="/elections/:id" element={<ElectionDetail />} />
          <Route path="/treasury" element={<Treasury />} />
          <Route path="/submit-proposal" element={<SubmitProposal />} />
          <Route path="/management" element={<Management />} />
        </Routes>
      </Router>
    </div>
  </DarkModeProvider>
);

export default App;
