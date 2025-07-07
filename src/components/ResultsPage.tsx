import { useLocation, useNavigate } from 'react-router-dom';
import { SearchResultsView } from '../views/SearchResultsView';

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const response = location.state?.results;

  if (!response) {
    return (
      <div>
        <p>No hay resultados para mostrar.</p>
        <button onClick={() => navigate('/')}>Volver a buscar</button>
      </div>
    );
  }

  return <SearchResultsView response={response} />;
};

export default ResultsPage;
