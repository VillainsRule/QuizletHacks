(() => {
    const setData = JSON.parse(__NEXT_DATA__.props.pageProps.dehydratedReduxStateKey);
    const cards = setData.studyModesCommon.studiableData.studiableItems;

    document.body.insertAdjacentHTML('beforeend', `<style>label[class="AssemblyInput"]::placeholder { opacity: 0.5 }`);

    setInterval(() => {
        const term = document.querySelector('p').innerText;
        const card = cards.find((card) => card.cardSides.some((side) => side.media[0].plainText == term));
        if (!card) return;

        const otherSide = card.cardSides.find((side) => side.media[0].plainText !== term);
        document.querySelector('input').placeholder = 'answer: ' + otherSide.media[0].plainText;
    }, 100);
})();
