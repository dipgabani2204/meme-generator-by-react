import React from "react"

export default function Meme() {

    const [meme, setMeme] = React.useState(
        {
            topText: "",
            bottomText: "",
            imgURL: "http://i.imgflip.com/1bij.jpg"
        }
    )

    const [memes, setMemes] = React.useState([])

    React.useEffect(async () => {
        let res = await fetch("https://api.imgflip.com/get_memes")
        let data = res.json()
        setMemes(data.data.memes)
    },[])

    function handleChange(event) {
        const {name, value} = event.target
        setMeme(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    function handleClick(event) {
        const random_num = Math.floor(Math.random() * (memes.length + 1))
        setMeme(prevData => {
            return ({
                ...prevData,
                imgURL: memes[random_num].url
            })
        })
    }

    return (
        <main>
            <div className="form">
                <input
                    type="text"
                    placeholder="Top text"
                    className="form--input"
                    onChange={handleChange}
                    name="topText"
                />
                <input
                    type="text"
                    placeholder="Bottom text"
                    className="form--input"
                    onChange={handleChange}
                    name="bottomText"
                />
                <button onClick={handleClick}
                    className="form--button"
                >
                    Get a new meme image 🖼
                </button>
            </div>

            <div className="meme">
                <img src={meme.imgURL} className="meme--image" />
                <h2 className="meme--text top" >{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>

        </main>
    )
}