import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllTasks } from '../redux/taskSlice'
import { Link } from 'react-router-dom'
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
  BookmarkIcon,
  ClockIcon,
  UserCircleIcon
} from '@heroicons/react/20/solid'
import { Menu, Transition } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const Home = () => {
  const auth = useSelector((state) => state.auth)

  const tasks = useSelector((state) => state.task)
  const { currentUser } = auth
  const { AllTasks } = tasks
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllTasks(currentUser.token, currentUser.id, currentUser.role))
  }, [dispatch, currentUser.token, currentUser.id, currentUser.role])

  const hasTasks = Object.values(AllTasks).length > 0;

  return (
    <div className="bg-gray-100">
      {/* Header */}
      <header className="bg-blue-400 text-white p-4 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Welcome to Your Dashboard, {currentUser.name}</h1>
          <p className="text-sm">Explore your tasks here.</p>
        </div>
      </header>

      {hasTasks ? (
        // Render your task list
        Object.values(AllTasks).map((item) => {
          const date = new Date(item.date).toLocaleDateString();
          return (
            <div
              className={`lg:flex sm:px-6 mx-auto mt-4 max-w-7xl lg:items-center lg:justify-between p-4  shadow-lg rounded-lg mt-2 transition-transform hover:transform hover:translate-y-1 hover:shadow-xl ${
                item.priority === 'Done' ? 'bg-green-100' : 'bg-white'
              }`}
            >
              <div className="min-w-0 flex-1">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                  {item.task}
                </h2>
                <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <BookmarkIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    {item.priority}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <UserCircleIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    {currentUser.role}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                    {date}
                  </div>
                </div>
              </div>
              <div className="mt-5 flex lg:ml-4 lg:mt-0">
                <span className="hidden sm:block">
                  <Link to={`/edit/${item._id}`}>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      <PencilIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                      Edit
                    </button>
                  </Link>
                </span>
                <span className="ml-3 hidden sm:block">
                  <Link to={`/view/${item._id}`}>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      <LinkIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                      View
                    </button>
                  </Link>
                </span>
                {item.priority === 'Done' ? (
                  <span className="sm:ml-3">
                    {/* <button
                        type="button"
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        <CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                        {item.priority}
                      </button> */}
                  </span>
                ) : (
                  <span className="sm:ml-3">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      <ClockIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
                      {item.priority}
                    </button>
                  </span>
                )}
                {/* Dropdown */}
                <Menu as="div" className="relative ml-3 sm:hidden">
                  <Menu.Button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
                    More
                    <ChevronDownIcon className="-mr-1 ml-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link to={`/edit/${item._id}`}>
                            <button
                              type="button"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Edit
                            </button>
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link to={`/view/${item._id}`}>
                            <button
                              type="button"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              View
                            </button>
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center mt-8 mx-auto p-6 w-[36.125rem] shadow-lg rounded-lg mt-2 transition-transform hover:transform hover:translate-y-1 hover:shadow-xl bg-yellow-100">
          <h1 className="text-2xl mb-4">You do not have any task !</h1>
          <Link to="/addtask">
            <button
              type="button"
              className="inline-flex items-center rounded-md  px-3 py-2 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2  bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              Add a Task
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
