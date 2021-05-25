import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {DEVELOPER, URL} from "../const/const";
const useApi = url => {
	const [isLoading, setLoading] = useState(false);
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	const [options, setOptions] = useState({});
	
	const apiBase = URL;
	const developer = DEVELOPER;
	
	const doApiFetch = useCallback((options = {}) => {
		setOptions(options);
		setResponse(null);
		setError(null);
		setLoading(true);
	}, []);
	
	const {method = 'GET', params, form} = options;
	
	useEffect(() => {
		
		if (!isLoading) return;
		
		const headers = {
			'Content-Type': method === 'POST'? 'multipart/form-data' : 'application/json',
		}
		
		const axiosOptions = {
			method: method,
			baseURL: apiBase,
			url,
			headers,
			params: params ? {...params, developer} : {developer},
			data: method !== 'GET' ? form : null,
		}
		
		const fetchData = async () => {
			await axios(axiosOptions)
				.then((response) => {
					setLoading(false);
					if (response.data.status !== 'ok') {
						const error = new Error();
						error.message = response.data.message;
						throw error;
					}
					setResponse(response.data.message);
				})
				.catch((error) => {
					setLoading(false);
					setError(error.message);
				})
		}
		
		fetchData();
	}, [isLoading, apiBase, developer, form, method, params, url]);
	return [{isLoading, response, error}, doApiFetch];
}

export default useApi;
