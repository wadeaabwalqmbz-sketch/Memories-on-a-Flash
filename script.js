    const menu = document.getElementById('menu');
    let mousePos = { x: 0, y: 0 };
    let selected = null;
    let clip = null;

    window.oncontextmenu = (e) => {
      e.preventDefault();
      mousePos = { x: e.clientX, y: e.clientY };

      const card = e.target.closest('.card');
      if (card) {
        selectCard(card);
      } else {
        deselect();
      }

      menu.style.left = `${mousePos.x}px`;
      menu.style.top = `${mousePos.y}px`;
      menu.classList.remove('hidden');
    };

    window.onclick = () => menu.classList.add('hidden');

    function selectCard(card) {
      deselect();
      selected = card;
      selected.classList.add('ring-2', 'ring-red-500/80');
    }

    function deselect() {
      if (selected) selected.classList.remove('ring-2', 'ring-red-500/80');
      selected = null;
    }

    function addCard(x = mousePos.x, y = mousePos.y, text = '') {
      const card = document.createElement('div');
      card.className = 'card absolute w-36 min-h-[60px] p-2 bg-[#27272a] border border-[#3f3f46] rounded-lg shadow-md cursor-move flex flex-col transition-all';
      card.style.left = `${x}px`;
      card.style.top = `${y}px`;

      const content = document.createElement('div');
      content.className = 'w-full h-full min-h-[45px] outline-none text-gray-100 text-xs cursor-text select-text break-words leading-snug';
      content.contentEditable = true;
      content.innerText = text;

      card.appendChild(content);
      document.body.appendChild(card);

      card.onmousedown = (e) => {
        selectCard(card);
        if (e.target === content && document.activeElement === content) return;

        let shiftX = e.clientX - card.offsetLeft;
        let shiftY = e.clientY - card.offsetTop;

        document.onmousemove = (moveEvt) => {
          card.style.left = `${moveEvt.clientX - shiftX}px`;
          card.style.top = `${moveEvt.clientY - shiftY}px`;
        };

        document.onmouseup = () => document.onmousemove = null;
      };

      selectCard(card);
      setTimeout(() => content.focus(), 10);
    }

     function copyCard() {
      if (selected) {
        clip = { text: selected.querySelector('div').innerText, cut: false };
      }
    }

    function cutCard() {
      if (selected) {
        clip = { text: selected.querySelector('div').innerText, cut: true, el: selected };
        selected.classList.add('opacity-40', 'border-dashed', 'border-gray-500');
      }
    }

    function pasteCard() {
      if (!clip) return;
      addCard(mousePos.x, mousePos.y, clip.text);
      if (clip.cut && clip.el) {
        clip.el.remove();
        clip = null;
      }
    }

    function deleteCard() {
      if (selected) {
        selected.remove();
        selected = null;
      }
    }






