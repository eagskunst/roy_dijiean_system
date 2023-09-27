import { useState, useEffect } from 'react';

const url = 'http://localhost:3000/api';

export const useClients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({
    password: '',
    cedula: '',
    email: '',
    address: '',
    name: '',
    cellphone_number: '',
  });

  const [isEdit, setIsEdit] = useState(false);

  const getClients = async () => {
    try {
      const response = await fetch(`${url}/client`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const dataResponse = await response.json();
      if (response.ok) {
        setClients(() => dataResponse.clients);
      }
      throw new Error(dataResponse.message);
    } catch (error) {
      return {};
    } finally {
      setLoading(false);
    }
  };

  const addClient = async () => {
    setLoading(true);
    if (!isEdit) {
      try {
        const response = await fetch(`${url}/client`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            address: formValues.address,
            cellphone_number: formValues.cellphone_number,
            cedula: formValues.cedula,
            user: {
              email: formValues.email,
              password: formValues.password,
              name: formValues.name,
            },
          }),
        });
        const dataResponse = await response.json();
        throw new Error(dataResponse.message);
      } catch (error) {
        return {};
      } finally {
        getClients();
        setLoading(false);
      }
    } else {
      try {
        const response = await fetch(`${url}/client`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify({
            address: formValues.address,
            cellphone_number: formValues.cellphone_number,
            cedula: formValues.cedula,
            user: {
              email: formValues.email,
              password: formValues.password,
              name: formValues.name,
            },
          }),
        });
        const dataResponse = await response.json();
        throw new Error(dataResponse.message);
      } catch (error) {
        return {};
      } finally {
        setIsEdit(false);
        getClients();
        setLoading(false);
      }
    }
  };

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const deleteClient = async (cedula) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}/client/${cedula}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const dataResponse = await response.json();
      throw new Error(dataResponse.message);
    } catch (error) {
      return {};
    } finally {
      getClients();
      setLoading(false);
    }
  };

  useEffect(() => {
    getClients();
  }, []);

  return { clients, loading, formValues, handleFormChange, addClient, deleteClient, setIsEdit };
};
