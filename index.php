<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <!-- Font Awesome -->
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
    <!-- Google fonts -->
    <link href="https://fonts.googleapis.com/css?family=Montserrat:100,400" rel="stylesheet">
    <!-- Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <!-- CSS and JavaScript-->
    <link rel="stylesheet" href="css/styles.css">
    <script src="js/scripts.js"></script>

    <!-- Require of PHP -->
    <?php require_once('categories-config.php') ; ?>

    <title>Category Filter</title>
  </head>
  <body>
      <main>
          <div class="container">
                <div class="row">
                    <div class="col-sm-6">
                        <div class="card rounded-0">
                            <div class="card-header bg-white">
                                <div class="search-container">
                                    <form>
                                      <i class="fa fa-search" style="margin-right: 3%;"></i>
                                      <input class="border-0 search-input" type="text" id="search" placeholder="Search Categories" name="search" onkeyup="doSearch(this.value);">
                                    </form>
                                </div>
                            </div>
                            <div class="card-body">
                                <div id="search-msg">
                                    <p id="no-search" style="display: none;"></p>
                                </div>
                                <div class="back-button">
                                    <button id="backBtn" type="button" class="btn btn-light badge-pill text-secondary btn-back" onclick="goBack(this);" style="display: none;">
                                        <i class="fa fa-angle-left"></i>
                                        Back
                                    </button>
                                </div>
                                <div id="all-categories">
                                    <i class="fa fa-tags"></i>
                                    <span>All categories</span> 
                                </div>
                                <div id="tree-content">
                                    <ul id="treeview" class="list-group">
                                        <div id="list" class="custom-control custom-checkbox">
                                        <?php recursivePrint($categories); ?>
                                        </div>
                                    </ul>

                                    <script type="text/javascript">
                                        //Make treeview collapsable
                                        const trigger = document.querySelectorAll(".toggle");

                                        for (let i=0; i<trigger.length; i++) {
                                            if(trigger[i].parentNode.classList.contains("parent")){
                                                    trigger[i].addEventListener("click", function() {
                                                    this.parentElement.querySelector(".nested").classList.toggle("active");
                                                });
                                            }
                                        }
                                    </script>

                                </div>
                            <div id="containerBtn" class="card-footer border-success bg-success rounded-0" style="display: none;">
                                <div class="container-fluid">
                                    <div class="row">
                                        <div class="col-6">
                                            <button id="btn-cancel" type="button" class="btn btn-success text-light" onclick="cancelSelection();">
                                                Cancel
                                            </button>
                                        </div>
                                        <div class="col-6 text-right">
                                            <button id="btn-apply" type="button" class="btn text-white btn-success btn-apply" onclick="applySelection();">
                                                <i class="fa fa-check text-white"></i>
                                                Apply
                                            </button>
                                        </div>
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <p><strong>Applied checks:</strong></p>
                        <p id="selected-items"></p>
                    </div>
                </div>
          </div>
      </main>
    <footer>
    </footer>
  </body>
  </html>
