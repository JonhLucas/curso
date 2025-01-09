import './styles.css';

export const TextInput = ({searchValue, handleChange}) => {
    return (<input type="search" 
        name="pesquisa" id="search-input" 
        onChange={handleChange} 
        value={searchValue}
        className='text-input'
        placeholder='Digite aqui'/>
    );
}