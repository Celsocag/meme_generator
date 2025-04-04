import { useState, useEffect } from "react"

export default function Main() {

    const [memeContent, setmemeContent] = useState(
        {
            topText: 'One does not simply',
            bottomText: 'Walk into Mordor',
            imageUrl: 'http://i.imgflip.com/1bij.jpg'
        }
    )

    function handleChange(e){
        const {value, name} = e.currentTarget
        setmemeContent(prevVal => ({...prevVal, [name]: value}))
    }

    const [allMemes, setAllMemes] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    }, []);
  
    function getRandomMeme(){
        const randomNum = Math.floor(Math.random() * allMemes.length);
        const newMemeUrl = allMemes[randomNum].url
        setmemeContent((prevContent)=>({...prevContent, newMemeUrl}))
    }

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder={memeContent.topText}
                        value={memeContent.topText}
                        name="topText"
                        onChange={handleChange}
                    />
                </label>

                <label>Bottom Text
                    <input
                        type="text"
                        placeholder={memeContent.bottomText}
                        value={memeContent.bottomText}
                        name="bottomText"
                        onChange={handleChange}
                    />
                </label>
                <button onClick={getRandomMeme}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={memeContent.imageUrl}/>
                <span className="top">{memeContent.topText}</span>
                <span className="bottom">{memeContent.bottomText}</span>
            </div>
        </main>
    )
}