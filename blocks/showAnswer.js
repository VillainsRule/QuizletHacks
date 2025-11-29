(() => {
    const setData = JSON.parse(__NEXT_DATA__.props.pageProps.dehydratedReduxStateKey);
    const cards = setData.studyModesCommon.studiableData.studiableItems;

    document.body.insertAdjacentHTML('beforeend', `<style>label[class="AssemblyInput"]::placeholder { opacity: 0.5 }`);

    setInterval(() => {
        const image = document.querySelector('img[src]')?.src;
        const term = document.querySelector('p').innerText;
        const card = cards.find((card) => card.cardSides.some((side) => side.media[0].plainText == term && (image ? side.media[1]?.url?.replace('_m.', '.') === image : true)));
        if (!card) return;

        const otherSide = card.cardSides.find((side) => side.media[0].plainText !== term);
        document.querySelector('input').placeholder = 'answer: ' + otherSide.media[0].plainText;
    }, 100);
})();
