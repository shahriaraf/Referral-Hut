import React from "react";
const Profile = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-800">

      <div class="relative max-w-3xl mx-auto px-4 mb-6">
        <div class="relative overflow-hidden rounded-2xl shadow-2xl">
          <div class="absolute inset-0 bg-gradient-to-br from-indigo-700/30 via-violet-600 to-cyan-700/30 opacity-80"></div>
          <div class="absolute inset-0 overflow-hidden">
            <div
              class="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] animate-spin-slow"
              style={{
                background:
                  "conic-gradient(transparent 0%, rgba(99,102,241,0.1) 20%, transparent 40%, rgba(6,182,212,0.1) 60%, transparent 80%, rgba(99,102,241,0.1) 100%)",
              }}
            ></div>
          </div>
          <div class="relative z-10 p-6">
            <div class="flex items-start justify-between">
              <div class="flex items-center space-x-4">
                <div class="relative">
                  <img
                    alt="Profile"
                    class="w-16 h-16 rounded-xl border-2 border-white/20 shadow-lg"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=128&amp;h=128&amp;q=80"
                  />
                  <div class="absolute -bottom-2 -right-2 bg-amber-500 rounded-full p-1 border-2 border-gray-900">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 24 24"
                      class="text-white text-xs"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19.965 8.521C19.988 8.347 20 8.173 20 8c0-2.379-2.143-4.288-4.521-3.965C14.786 2.802 13.466 2 12 2s-2.786.802-3.479 2.035C6.138 3.712 4 5.621 4 8c0 .173.012.347.035.521C2.802 9.215 2 10.535 2 12s.802 2.785 2.035 3.479A3.976 3.976 0 0 0 4 16c0 2.379 2.138 4.283 4.521 3.965C9.214 21.198 10.534 22 12 22s2.786-.802 3.479-2.035C17.857 20.283 20 18.379 20 16c0-.173-.012-.347-.035-.521C21.198 14.785 22 13.465 22 12s-.802-2.785-2.035-3.479zm-9.01 7.895-3.667-3.714 1.424-1.404 2.257 2.286 4.327-4.294 1.408 1.42-5.749 5.706z"></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <h2 class="text-xl font-bold text-white flex items-center">
                    Jhone doe
                    <span class="ml-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-xs px-2 py-0.5 rounded-full flex items-center">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 576 512"
                        class="mr-1"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M485.5 0L576 160H474.9L405.7 0h79.8zm-128 0l69.2 160H149.3L218.5 0h139zm-267 0h79.8l-69.2 160H0L90.5 0zM0 192h100.7l123 251.7c1.5 3.1-2.7 5.9-5 3.3L0 192zm148.2 0h279.6l-137 318.2c-1 2.4-4.5 2.4-5.5 0L148.2 192zm204.1 251.7l123-251.7H576L357.3 446.9c-2.3 2.7-6.5-.1-5-3.2z"></path>
                      </svg>
                      DIAMOND
                    </span>
                  </h2>
                  <p class="text-sm text-gray-300">@sarah_investor</p>
                  <div class="mt-2 flex items-center space-x-2">
                    <span class="bg-gray-800/50 px-2 py-1 rounded-md text-xs border border-cyan-500/20 text-cyan-300 flex items-center">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 512 512"
                        class="mr-1"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M0 405.3V448c0 35.3 86 64 192 64s192-28.7 192-64v-42.7C342.7 434.4 267.2 448 192 448S41.3 434.4 0 405.3zM320 128c106 0 192-28.7 192-64S426 0 320 0 128 28.7 128 64s86 64 192 64zM0 300.4V352c0 35.3 86 64 192 64s192-28.7 192-64v-51.6c-41.3 34-116.9 51.6-192 51.6S41.3 334.4 0 300.4zm416 11c57.3-11.1 96-31.7 96-55.4v-42.7c-23.2 16.4-57.3 27.6-96 34.5v63.6zM192 160C86 160 0 195.8 0 240s86 80 192 80 192-35.8 192-80-86-80-192-80zm219.3 56.3c60-10.8 100.7-32 100.7-56.3v-42.7c-35.5 25.1-96.5 38.6-160.7 41.8 29.5 14.3 51.2 33.5 60 57.2z"></path>
                      </svg>{" "}
                      12,450.00
                    </span>
                    <span class="bg-gray-800/50 px-2 py-1 rounded-md text-xs border border-emerald-500/20 text-emerald-300">
                      +12.5% this month
                    </span>
                  </div>
                </div>
              </div>
              <button class="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-lg border border-white/10 transition-all">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="relative max-w-3xl mx-auto px-4 mb-6">
        <div class="grid grid-cols-3 gap-3">
          <div class="bg-cyan-600/50 backdrop-blur-sm rounded-xl p-3 border border-gray-700/50 shadow-sm">
            <p class="text-xs text-gray-400">Active Plans</p>
            <p class="text-xl font-bold text-white">3</p>
            <div class="h-1 mt-2 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"></div>
          </div>
          <div class="bg-cyan-600/50 backdrop-blur-sm rounded-xl p-3 border border-gray-700/50 shadow-sm">
            <p class="text-xs text-gray-400">Total Profit</p>
            <p class="text-xl font-bold text-white">$2,450</p>
            <div class="h-1 mt-2 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"></div>
          </div>
          <div class="bg-cyan-600/50 backdrop-blur-sm rounded-xl p-3 border border-gray-700/50 shadow-sm">
            <p class="text-xs text-gray-400">VIP Level</p>
            <p class="text-xl font-bold text-white">Diamond</p>
            <div class="h-1 mt-2 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full"></div>
          </div>
        </div>
      </div>
      <div class="relative max-w-3xl mx-auto px-4 mb-6">
        <div class="grid grid-cols-4 gap-2">
          <button class="bg-indigo-900/30 hover:bg-indigo-900/50 p-3 rounded-lg border border-indigo-700/30 flex flex-col items-center transition-all group">
            <div class="bg-white/10 p-2 rounded-lg mb-2 group-hover:bg-white/20">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 384 512"
                class="text-indigo-300 text-xl"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM96 424c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm96-192c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm128 368c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z"></path>
              </svg>
            </div>
            <span class="text-xs text-white">Deposit</span>
          </button>
          <button class="bg-purple-900/30 hover:bg-purple-900/50 p-3 rounded-lg border border-purple-700/30 flex flex-col items-center transition-all group">
            <div class="bg-white/10 p-2 rounded-lg mb-2 group-hover:bg-white/20">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 640 512"
                class="text-purple-300 text-xl"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M608 32H32C14.33 32 0 46.33 0 64v384c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V64c0-17.67-14.33-32-32-32zM176 327.88V344c0 4.42-3.58 8-8 8h-16c-4.42 0-8-3.58-8-8v-16.29c-11.29-.58-22.27-4.52-31.37-11.35-3.9-2.93-4.1-8.77-.57-12.14l11.75-11.21c2.77-2.64 6.89-2.76 10.13-.73 3.87 2.42 8.26 3.72 12.82 3.72h28.11c6.5 0 11.8-5.92 11.8-13.19 0-5.95-3.61-11.19-8.77-12.73l-45-13.5c-18.59-5.58-31.58-23.42-31.58-43.39 0-24.52 19.05-44.44 42.67-45.07V152c0-4.42 3.58-8 8-8h16c4.42 0 8 3.58 8 8v16.29c11.29.58 22.27 4.51 31.37 11.35 3.9 2.93 4.1 8.77.57 12.14l-11.75 11.21c-2.77 2.64-6.89 2.76-10.13.73-3.87-2.43-8.26-3.72-12.82-3.72h-28.11c-6.5 0-11.8 5.92-11.8 13.19 0 5.95 3.61 11.19 8.77 12.73l45 13.5c18.59 5.58 31.58 23.42 31.58 43.39 0 24.53-19.05 44.44-42.67 45.07zM416 312c0 4.42-3.58 8-8 8H296c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h112c4.42 0 8 3.58 8 8v16zm160 0c0 4.42-3.58 8-8 8h-80c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16zm0-96c0 4.42-3.58 8-8 8H296c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h272c4.42 0 8 3.58 8 8v16z"></path>
              </svg>
            </div>
            <span class="text-xs text-white">Withdraw</span>
          </button>
          <button class="bg-emerald-900/30 hover:bg-emerald-900/50 p-3 rounded-lg border border-emerald-700/30 flex flex-col items-center transition-all group">
            <div class="bg-white/10 p-2 rounded-lg mb-2 group-hover:bg-white/20">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 512 512"
                class="text-emerald-300 text-xl"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM464 96H345.94c-21.38 0-32.09 25.85-16.97 40.97l32.4 32.4L288 242.75l-73.37-73.37c-12.5-12.5-32.76-12.5-45.25 0l-68.69 68.69c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L192 237.25l73.37 73.37c12.5 12.5 32.76 12.5 45.25 0l96-96 32.4 32.4c15.12 15.12 40.97 4.41 40.97-16.97V112c.01-8.84-7.15-16-15.99-16z"></path>
              </svg>
            </div>
            <span class="text-xs text-white">Invest</span>
          </button>
          <button class="bg-amber-900/30 hover:bg-amber-900/50 p-3 rounded-lg border border-amber-700/30 flex flex-col items-center transition-all group">
            <div class="bg-white/10 p-2 rounded-lg mb-2 group-hover:bg-white/20">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 24 24"
                class="text-amber-300 text-xl"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="none" d="M0 0h24v24H0z"></path>
                <path d="M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"></path>
              </svg>
            </div>
            <span class="text-xs text-white">Security</span>
          </button>
        </div>
      </div>

      <div class="relative max-w-3xl mx-auto px-4 mb-6">
        <div class="space-y-2">
          <div class="group bg-gray-900/50 hover:bg-gray-800/70 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-700/50 hover:border-indigo-500/30 flex items-center justify-between cursor-pointer">
            <div class="flex items-center space-x-3">
              <div class="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-all">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 384 512"
                  class="text-cyan-300"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM96 424c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm96-192c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm128 368c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z"></path>
                </svg>
              </div>
              <span class="font-medium text-white">Transaction History</span>
            </div>
            <div class="flex items-center">
              <span class="bg-indigo-500/10 text-indigo-300 text-xs px-2 py-0.5 rounded-full mr-2">
                New
              </span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 320 512"
                class="text-gray-500 group-hover:text-indigo-300 transition-colors"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
              </svg>
            </div>
          </div>
          <div class="group bg-gray-900/50 hover:bg-gray-800/70 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-700/50 hover:border-indigo-500/30 flex items-center justify-between cursor-pointer">
            <div class="flex items-center space-x-3">
              <div class="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-all">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 640 512"
                  class="text-purple-300"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M608 32H32C14.33 32 0 46.33 0 64v384c0 17.67 14.33 32 32 32h576c17.67 0 32-14.33 32-32V64c0-17.67-14.33-32-32-32zM176 327.88V344c0 4.42-3.58 8-8 8h-16c-4.42 0-8-3.58-8-8v-16.29c-11.29-.58-22.27-4.52-31.37-11.35-3.9-2.93-4.1-8.77-.57-12.14l11.75-11.21c2.77-2.64 6.89-2.76 10.13-.73 3.87 2.42 8.26 3.72 12.82 3.72h28.11c6.5 0 11.8-5.92 11.8-13.19 0-5.95-3.61-11.19-8.77-12.73l-45-13.5c-18.59-5.58-31.58-23.42-31.58-43.39 0-24.52 19.05-44.44 42.67-45.07V152c0-4.42 3.58-8 8-8h16c4.42 0 8 3.58 8 8v16.29c11.29.58 22.27 4.51 31.37 11.35 3.9 2.93 4.1 8.77.57 12.14l-11.75 11.21c-2.77 2.64-6.89 2.76-10.13.73-3.87-2.43-8.26-3.72-12.82-3.72h-28.11c-6.5 0-11.8 5.92-11.8 13.19 0 5.95 3.61 11.19 8.77 12.73l45 13.5c18.59 5.58 31.58 23.42 31.58 43.39 0 24.53-19.05 44.44-42.67 45.07zM416 312c0 4.42-3.58 8-8 8H296c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h112c4.42 0 8 3.58 8 8v16zm160 0c0 4.42-3.58 8-8 8h-80c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h80c4.42 0 8 3.58 8 8v16zm0-96c0 4.42-3.58 8-8 8H296c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h272c4.42 0 8 3.58 8 8v16z"></path>
                </svg>
              </div>
              <span class="font-medium text-white">Withdraw Details</span>
            </div>
            <div class="flex items-center">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 320 512"
                class="text-gray-500 group-hover:text-indigo-300 transition-colors"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
              </svg>
            </div>
          </div>
          <div class="group bg-gray-900/50 hover:bg-gray-800/70 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-700/50 hover:border-indigo-500/30 flex items-center justify-between cursor-pointer">
            <div class="flex items-center space-x-3">
              <div class="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-all">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  class="text-emerald-300"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M496 384H64V80c0-8.84-7.16-16-16-16H16C7.16 64 0 71.16 0 80v336c0 17.67 14.33 32 32 32h464c8.84 0 16-7.16 16-16v-32c0-8.84-7.16-16-16-16zM464 96H345.94c-21.38 0-32.09 25.85-16.97 40.97l32.4 32.4L288 242.75l-73.37-73.37c-12.5-12.5-32.76-12.5-45.25 0l-68.69 68.69c-6.25 6.25-6.25 16.38 0 22.63l22.62 22.62c6.25 6.25 16.38 6.25 22.63 0L192 237.25l73.37 73.37c12.5 12.5 32.76 12.5 45.25 0l96-96 32.4 32.4c15.12 15.12 40.97 4.41 40.97-16.97V112c.01-8.84-7.15-16-15.99-16z"></path>
                </svg>
              </div>
              <span class="font-medium text-white">Investment Analytics</span>
            </div>
            <div class="flex items-center">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 320 512"
                class="text-gray-500 group-hover:text-indigo-300 transition-colors"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
              </svg>
            </div>
          </div>
          <div class="group bg-gray-900/50 hover:bg-gray-800/70 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-700/50 hover:border-indigo-500/30 flex items-center justify-between cursor-pointer">
            <div class="flex items-center space-x-3">
              <div class="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-all">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  class="text-pink-300"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path>
                </svg>
              </div>
              <span class="font-medium text-white">Download APP</span>
            </div>
            <div class="flex items-center">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 320 512"
                class="text-gray-500 group-hover:text-indigo-300 transition-colors"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
              </svg>
            </div>
          </div>
          <div class="group bg-gray-900/50 hover:bg-gray-800/70 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-700/50 hover:border-indigo-500/30 flex items-center justify-between cursor-pointer">
            <div class="flex items-center space-x-3">
              <div class="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-all">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  class="text-amber-300"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M461.2 128H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h384c8.84 0 16-7.16 16-16 0-26.51-21.49-48-48-48H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h397.2c28.02 0 50.8-21.53 50.8-48V176c0-26.47-22.78-48-50.8-48zM416 336c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"></path>
                </svg>
              </div>
              <span class="font-medium text-white">My Portfolio</span>
            </div>
            <div class="flex items-center">
              <span class="bg-indigo-500/10 text-indigo-300 text-xs px-2 py-0.5 rounded-full mr-2">
                3
              </span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 320 512"
                class="text-gray-500 group-hover:text-indigo-300 transition-colors"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
              </svg>
            </div>
          </div>
          <div class="group bg-gray-900/50 hover:bg-gray-800/70 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-700/50 hover:border-indigo-500/30 flex items-center justify-between cursor-pointer">
            <div class="flex items-center space-x-3">
              <div class="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-all">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 448 512"
                  class="text-red-300"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path>
                </svg>
              </div>
              <span class="font-medium text-white">Security Center</span>
            </div>
            <div class="flex items-center">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 320 512"
                class="text-gray-500 group-hover:text-indigo-300 transition-colors"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
              </svg>
            </div>
          </div>
          <div class="group bg-gray-900/50 hover:bg-gray-800/70 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-700/50 hover:border-indigo-500/30 flex items-center justify-between cursor-pointer">
            <div class="flex items-center space-x-3">
              <div class="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-all">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 448 512"
                  class="text-blue-300"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
                </svg>
              </div>
              <span class="font-medium text-white">Account Settings</span>
            </div>
            <div class="flex items-center">
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 320 512"
                class="text-gray-500 group-hover:text-indigo-300 transition-colors"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
              </svg>
            </div>
          </div>
          <div class="group bg-gray-900/50 hover:bg-gray-800/70 backdrop-blur-sm p-4 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-700/50 hover:border-indigo-500/30 flex items-center justify-between cursor-pointer">
            <div class="flex items-center space-x-3">
              <div class="p-2 rounded-lg bg-white/5 group-hover:bg-white/10 transition-all">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  class="text-yellow-300"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M256 464c22.779 0 41.411-18.719 41.411-41.6h-82.823c0 22.881 18.633 41.6 41.412 41.6zm134.589-124.8V224.8c0-63.44-44.516-117.518-103.53-131.041V79.2c0-17.682-13.457-31.2-31.059-31.2s-31.059 13.518-31.059 31.2v14.559c-59.015 13.523-103.53 67.601-103.53 131.041v114.4L80 380.8v20.8h352v-20.8l-41.411-41.6z"></path>
                </svg>
              </div>
              <span class="font-medium text-white">Notifications</span>
            </div>
            <div class="flex items-center">
              <span class="bg-indigo-500/10 text-indigo-300 text-xs px-2 py-0.5 rounded-full mr-2">
                5
              </span>
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 320 512"
                class="text-gray-500 group-hover:text-indigo-300 transition-colors"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
<div class="relative max-w-3xl mx-auto px-4">
  <div class="relative overflow-hidden rounded-2xl shadow-2xl">
    {/* Light gradient background */}
    <div class="absolute inset-0 bg-gradient-to-br from-amber-100 via-white to-yellow-100 opacity-95"></div>

    {/* Soft animated shine effect */}
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] animate-spin-slow"
        style={{
          background:
            "conic-gradient(transparent 0%, rgba(99,102,241,0.05) 20%, transparent 40%, rgba(6,182,212,0.05) 60%, transparent 80%, rgba(99,102,241,0.05) 100%)",
        }}
      ></div>
    </div>

    {/* Content */}
    <div class="relative z-10 p-5">
      <div class="flex items-start justify-between mb-4">
        <div>
          <h3 class="font-bold text-black text-lg flex items-center">
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 640 512"
              class="text-black mr-2"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M528 448H112c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h416c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm64-320c-26.5 0-48 21.5-48 48 0 7.1 1.6 13.7 4.4 19.8L476 239.2c-15.4 9.2-35.3 4-44.2-11.6L350.3 85C361 76.2 368 63 368 48c0-26.5-21.5-48-48-48s-48 21.5-48 48c0 15 7 28.2 17.7 37l-81.5 142.6c-8.9 15.6-28.9 20.8-44.2 11.6l-72.3-43.4c2.7-6 4.4-12.7 4.4-19.8 0-26.5-21.5-48-48-48S0 149.5 0 176s21.5 48 48 48c2.6 0 5.2-.4 7.7-.8L128 416h384l72.3-192.8c2.5.4 5.1.8 7.7.8 26.5 0 48-21.5 48-48s-21.5-48-48-48z"></path>
            </svg>
            Black Card Membership
          </h3>
          <p class="text-gray-700 text-sm mt-1">
            Unlock premium benefits and exclusive rewards
          </p>
        </div>
        <div class="bg-amber-200/40 p-3 rounded-lg border border-amber-300/60">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 512 512"
            class="text-xl text-amber-600"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M461.2 128H80c-8.84 0-16-7.16-16-16s7.16-16 16-16h384c8.84 0 16-7.16 16-16 0-26.51-21.49-48-48-48H64C28.65 32 0 60.65 0 96v320c0 35.35 28.65 64 64 64h397.2c28.02 0 50.8-21.53 50.8-48V176c0-26.47-22.78-48-50.8-48zM416 336c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"></path>
          </svg>
        </div>
      </div>
      <button class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:text-purple-300 transition-colors duration-200 font-semibold py-3 rounded-lg text-sm transform hover:scale-[1.01] shadow-lg shadow-amber-500/20 flex items-center justify-center">
        Upgrade to Elite
      </button>
    </div>
  </div>
</div>

    </div>
  );
};

export default Profile;
