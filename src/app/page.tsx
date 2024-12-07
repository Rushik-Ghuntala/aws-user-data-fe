'use client'

import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

interface User {
  first_name: string;
  last_name: string;
  address?: string;
  phone?: string;
  email: string;
}

const UserSchema = Yup.object().shape({
  first_name: Yup.string().required('First Name is required'),
  last_name: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  address: Yup.string(),
  phone: Yup.string()
});

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSubmit = async (values: User, { resetForm }: any) => {
    try {
      await axios.post(API_URL, values);
      resetForm();
      fetchUsers();
    } catch (error) {
      console.error('Error submitting user:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      
      <Formik
        initialValues={{
          first_name: '',
          last_name: '',
          email: '',
          address: '',
          phone: ''
        }}
        validationSchema={UserSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <label>First Name</label>
              <Field 
                name="first_name" 
                className="border p-2 w-full"
              />
              {errors.first_name && touched.first_name && (
                <div className="text-red-500">{errors.first_name}</div>
              )}
            </div>
            
            <div>
              <label>Last Name</label>
              <Field 
                name="last_name" 
                className="border p-2 w-full"
              />
              {errors.last_name && touched.last_name && (
                <div className="text-red-500">{errors.last_name}</div>
              )}
            </div>
            
            <div>
              <label>Email</label>
              <Field 
                name="email" 
                type="email" 
                className="border p-2 w-full"
              />
              {errors.email && touched.email && (
                <div className="text-red-500">{errors.email}</div>
              )}
            </div>
            
            <div>
              <label>Address</label>
              <Field 
                name="address" 
                className="border p-2 w-full"
              />
            </div>
            
            <div>
              <label>Phone</label>
              <Field 
                name="phone" 
                className="border p-2 w-full"
              />
            </div>
            
            <button 
              type="submit" 
              className="bg-blue-500 text-white p-2 rounded"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>

      <button 
        onClick={fetchUsers} 
        className="bg-green-500 text-white p-2 rounded mt-4"
      >
        Fetch Users
      </button>

      <div className="mt-4">
        <h2 className="text-xl font-bold">Users</h2>
        {users.map((user, index) => (
          <div key={index} className="border p-2 mb-2">
            <p>Name: {user.first_name} {user.last_name}</p>
            <p>Email: {user.email}</p>
            {user.address && <p>Address: {user.address}</p>}
            {user.phone && <p>Phone: {user.phone}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}