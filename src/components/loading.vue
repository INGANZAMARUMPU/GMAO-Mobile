<template >
    <div class="loader_container">
      <div class="lds-roller">
        <div class="line">
          <div class="w-30 h-1.5 rounded-xl bg-sky-900"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  </script>
  
  <style scoped>
      .lds-roller{
        width: 100%;
      }

      .line{
        width: fit-content;
        position: relative;
        left: 20px;
        transition: .3s ease-in-out;
        animation: animation 2s linear  infinite;
      }
      @keyframes animation {
        0%{
          left: 20px;
        }
        50%{
          left: calc(98% - 120px);
        }
        100%{
          left: 20px;
        }
      }

  </style>