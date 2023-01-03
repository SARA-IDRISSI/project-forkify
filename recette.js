$("body").css("height", "100vh")
$(".content").css("height", "100vh")
$(".part-result").css("height", "81vh")
let bookmarks = [];
const resShow = () => {
    $(".res").click((event) => {

        $(".ingredient").empty();
        $(".loader-ing").css("display", "block")

        fetch(`https://forkify-api.herokuapp.com/api/get?rId=${event.currentTarget.id}`)
            .then((response) => response.json())

            .then((result) => {
                $(".loader-ing").css("display", "none")
                $(".ingredient").css("display", "block");
                $(".ingredient").append(` <div class="titl-img-recette" id="${result.recipe.recipe_id}">
        <img src="${result.recipe.image_url}" alt="" class="img-ingr" >

        <p class="small-titl one">${result.recipe.title}</p>
    
    </div >  <div class="smile" style="display: none;">
    <i class="fa-regular fa-face-smile"></i>
</div>
<div class="msg" style="display: none;">
    <p>Start by searching for a recipe or an ingredient. Have fun!</p>
</div>  <div class="sous-img">
<div class="nav1">
    <span class="clock">
        <i class="fa-regular fa-clock"></i>
        <strong>UNKOWN</strong> MINUTES
    </span>
</div>
<div class="nav2">
    <span class="clock">
        <i class="fa-solid fa-user-group"></i> SERVINGS </span>
    <button class="plus"><i class="fa-solid fa-plus"></i></button>
    <button class="plus"><i class="fa-solid fa-minus"></i></button>
</div>
<div class="nav3"></div>
<div class="nav4">
    <button class="nav4-btn"><i class="fa-regular fa-bookmark"></i></button>
</div>
</div> <div class="recipe-ingr">
<h2>RECIPE INGREDIENTS</h2>
<div class="tab-ing center">
${result.recipe.ingredients.map(ingredient => `<div class="col1">
<i class="fa-solid fa-check"></i><p class="ingredient-text">${ingredient}</p>
</div>`).join('')}
</div>

</div>

<div class="how-cook">
<h2>HOW TO COOK IT</h2>
<p>This recipe was carefully designed and tested by <strong class="cook">${result.recipe.publisher}</strong>. Please check out
directions at
their website.</p>

<a href="${result.recipe.publisher_url}"   target="_blank" class="direction" >DIRECTIONS <i class="fa-solid fa-arrow-right"></i> </a>

</div>

</div > `)
                $(".nav4-btn").click(event => {
                    event.preventDefault();
                    if (bookmarks.length == 0) {
                        $(".msg-empty").css("display", "none");
                    }
                    let index = bookmarks.indexOf(result.recipe.recipe_id)
                    if (index == -1) {
                        bookmarks.push(result.recipe.recipe_id);
                        $(".hover-bookmark").append(`<div class="res" id="${result.recipe.recipe_id}">
                        <img src=${result.recipe.image_url} alt="" class="img-res">
                        <div class="title">
                            <h4> ${result.recipe.title}</h4>
                        <h6>${result.recipe.publisher}</h6>
                    
                        </div >
                    </div > `)
                    } else {
                        $(`.hover-bookmark #${result.recipe.recipe_id}`).remove();
                        bookmarks.splice(index, 1);
                        if (bookmarks.length == 0) {
                            $(".msg-empty").css("display", "block");
                        }
                    }


                })

            })
    })
}

$("#form").submit((event) => {

    $(".results").empty()
    $(".pagination").empty();
    event.preventDefault();
    let value = $("#form-input").val();
    $(".loader").css("display", "block")

    fetch(`https://forkify-api.herokuapp.com/api/search?q=${value}`)
        .then((reponse) => {
            if (reponse.ok) {

                $(".error").css('display', 'none')
                return reponse.json()
            }
            else {

                $(".error").css('display', 'block')
                $(".res").css('display', 'none')
                return;
            }
        })
        .then((result) => {
            $(".loader").css("display", "none")

            $("body").css("height", "auto")
            $(".content").css("height", "auto")
            $(".part-result").css("height", "auto")
            $(".results").empty()
            let numberPages = Math.ceil(result.recipes.length / 10);

            result.recipes.slice(0, 10).forEach(recipe => {
                $(".results").append(`<div class="res" id="${recipe.recipe_id}">
                <img src=${recipe.image_url} alt="" class="img-res">
                <div class="title">
                    <h4> ${recipe.title}</h4>
                <h6>${recipe.publisher}</h6>

                </div >
            </div > `)
                ""
            });
            $(".pagination").empty()
            for (let i = 1; i <= numberPages; i++) {
                $(".pagination").append(`<a class="page" id="${i}" href="#">${i}</a>`)
            }
            resShow();
            $(".page").click(event => {
                event.preventDefault();
                let i = parseInt(event.currentTarget.id)
                $(".res").remove()
                result.recipes.slice((i - 1) * 10, i * 10).forEach(recipe => {

                    $(".results").append(`<div class="res" id="${recipe.recipe_id}">
                    <img src=${recipe.image_url} alt="" class="img-res">
                    <div class="title">
                        <h4> ${recipe.title}</h4>
                    <h6>${recipe.publisher}</h6>
    
                    </div >
                </div > `)
                });
                resShow();
            })


        })
})