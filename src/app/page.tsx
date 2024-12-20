"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

interface User {
  first_name: string;
  last_name: string;
  address?: string;
  phone?: string;
  email: string;
}

const UserSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string(),
  phone: Yup.string(),
});

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSubmit = async (values: User, { resetForm }: any) => {
    try {
      await axios.post(API_URL, values);
      resetForm();
      fetchUsers();
    } catch (error) {
      console.error("Error submitting user:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-pink-50 min-h-screen">
      {/* Navbar */}
      <nav className="bg-pink-200 p-4 text-purple-800 flex justify-between items-center rounded-lg shadow-md mb-6">
        <span className="text-lg font-bold">🌸 Rushik Ghuntala</span>
        <a
          href="https://rushik-ghuntala-portfolio.vercel.app/"
          target="_blank"
          className="text-purple-600 text-lg font-semibold hover:text-purple-800"
        >
          Portfolio
        </a>
      </nav>

      <h1 className="text-3xl font-extrabold text-pink-700 text-center mb-6">
        User Management
      </h1>

      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          address: "",
          phone: "",
        }}
        validationSchema={UserSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4 bg-white p-6 rounded-lg shadow-lg border border-pink-200">
            <div>
              <label className="block text-purple-700 font-medium">
                First Name
              </label>
              <Field
                name="first_name"
                className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-pink-300"
              />
              {errors.first_name && touched.first_name && (
                <div className="text-red-500 text-sm">{errors.first_name}</div>
              )}
            </div>

            <div>
              <label className="block text-purple-500 font-medium">
                Last Name
              </label>
              <Field
                name="last_name"
                className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-pink-300"
              />
              {errors.last_name && touched.last_name && (
                <div className="text-red-500 text-sm">{errors.last_name}</div>
              )}
            </div>

            <div>
              <label className="block text-purple-700 font-medium">Email</label>
              <Field
                name="email"
                type="email"
                className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-pink-300"
              />
              {errors.email && touched.email && (
                <div className="text-red-500 text-sm">{errors.email}</div>
              )}
            </div>

            <div>
              <label className="block text-purple-700 font-medium">
                Address
              </label>
              <Field
                name="address"
                className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-pink-300"
              />
            </div>

            <div>
              <label className="block text-purple-700 font-medium">Phone</label>
              <Field
                name="phone"
                className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-purple-300"
              />
            </div>

            <button
              type="submit"
              className="bg-purple-500 text-white font-bold p-2 rounded-lg hover:bg-purple-600 w-full"
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>

      <button
        onClick={fetchUsers}
        className="bg-green-500 text-white font-bold p-2 rounded-lg hover:bg-green-600 mt-6 w-full"
      >
        Fetch Users
      </button>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-pink-700 mb-4">Users</h2>
        {users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={index}
              className="bg-white border border-pink-200 rounded-lg p-4 mb-4 shadow-lg"
            >
              <p className="font-medium text-pink-700">
                Name: {user.first_name} {user.last_name}
              </p>
              <p>Email: {user.email}</p>
              {user.address && <p>Address: {user.address}</p>}
              {user.phone && <p>Phone: {user.phone}</p>}
            </div>
          ))
        ) : (
          <p className="text-pink-500">
            No users available. Click &quot;Fetch Users&quot; to load data.
          </p>
        )}
      </div>
    </div>
  );
}
