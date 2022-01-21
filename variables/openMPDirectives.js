/**
 * Lists of OpenMP directives which we will search for inside the code
 * @type {RegExp[]}
 */
// 67 Directives (Fortran)
// do and for are just saved as do (as fortran and c use different directive names for the same directive)
const openMPDirectivesAll = [
    "metadirective",
    "declare variant ",
    "requires",
    "parallel",
    "teams",
    "sections",
    "single ",
    "workshare",
    "do",
    "simd",
    "do simd",
    "declare simd",
    "distribute",
    "distribute simd",
    "distribute parallel do",
    "distribute parallel do simd ",
    "loop",
    "scan",
    "task",
    "taskloop",
    "taskloop simd",
    "taskyield",
    "allocate ",
    "target data",
    "target enter data",
    "target exit data",
    "target",
    "target update",
    "declare target",
    "parallel do",
    "parallel loop",
    "parallel sections",
    "parallel workshare",
    "parallel do simd",
    "parallel master",
    "master taskloop",
    "master taskloop simd",
    "parallel master taskloop",
    "parallel master taskloop simd",
    "teams distribute",
    "teams distribute simd ",
    "teams distribute parallel do",
    "teams distribute parallel do simd",
    "teams loop",
    "target parallel ",
    "target parallel do",
    "target parallel for simd",
    "target parallel loop",
    "target simd",
    "target teams",
    "target teams distribute",
    "target teams distribute simd",
    "target teams loop",
    "target teams distribute parallel do",
    "target teams distribute parallel do simd",
    "master",
    "critical",
    "barrier",
    "taskgroup",
    "atomic",
    "flush",
    "ordered",
    "depobj",
    "cancel",
    "cancellation point",
    "threadprivate",
    "declare reduction",
    "declare mapper",
]

// 67 Fortran Directives
const openMPDirectivesFortranString = [
    "!$omp metadirective",
    "!$omp declare variant ",
    "!$omp requires",
    "!$omp parallel",
    "!$omp teams",
    "!$omp sections",
    "!$omp single ",
    "!$omp workshare",
    "!$omp do",
    "!$omp simd",
    "!$omp do simd",
    "!$omp declare simd",
    "!$omp distribute",
    "!$omp distribute simd",
    "!$omp distribute parallel do",
    "!$omp distribute parallel do simd ",
    "!$omp loop",
    "!$omp scan",
    "!$omp task",
    "!$omp taskloop",
    "!$omp taskloop simd",
    "!$omp taskyield",
    "!$omp allocate ",
    "!$omp target data",
    "!$omp target enter data",
    "!$omp target exit data",
    "!$omp target",
    "!$omp target update",
    "!$omp declare target",
    "!$omp parallel do",
    "!$omp parallel loop",
    "!$omp parallel sections",
    "!$omp parallel workshare",
    "!$omp parallel do simd",
    "!$omp parallel master",
    "!$omp master taskloop",
    "!$omp master taskloop simd",
    "!$omp parallel master taskloop",
    "!$omp parallel master taskloop simd",
    "!$omp teams distribute",
    "!$omp teams distribute simd ",
    "!$omp teams distribute parallel do",
    "!$omp teams distribute parallel do simd",
    "!$omp teams loop",
    "!$omp target parallel ",
    "!$omp target parallel do",
    "!$omp target parallel for simd",
    "!$omp target parallel loop",
    "!$omp target simd",
    "!$omp target teams",
    "!$omp target teams distribute",
    "!$omp target teams distribute simd",
    "!$omp target teams loop",
    "!$omp target teams distribute parallel do",
    "!$omp target teams distribute parallel do simd",
    "!$omp master",
    "!$omp critical",
    "!$omp barrier",
    "!$omp taskgroup",
    "!$omp atomic",
    "!$omp flush",
    "!$omp ordered",
    "!$omp depobj",
    "!$omp cancel",
    "!$omp cancellation point",
    "!$omp threadprivate",
    "!$omp declare reduction",
    "!$omp declare mapper",
]

// 65 C/C++ Directives + two manually added space holders into the right position for the workshare/parallel workshare in Fortran
const openMPDirectivesCString = [
    "#pragma omp metadirective",
    "#pragma omp declare variant",
    "#pragma omp requires",
    "#pragma omp parallel",
    "#pragma omp teams",
    "#pragma omp sections",
    "#pragma omp single ",
    // manually added
    "space holder",
    "#pragma omp for ",
    "#pragma omp simd ",
    "#pragma omp for simd",
    "#pragma omp declare simd",
    "#pragma omp distribute",
    "#pragma omp distribute simd",
    "#pragma omp distribute parallel for",
    "#pragma omp distribute parallel for simd",
    "#pragma omp loop",
    "#pragma omp scan",
    "#pragma omp task",
    "#pragma omp taskloop",
    "#pragma omp taskloop simd ",
    "#pragma omp taskyield",
    "#pragma omp allocate",
    "#pragma omp target data",
    "#pragma omp target enter data",
    "#pragma omp target exit data",
    "#pragma omp target",
    "#pragma omp target update",
    "#pragma omp declare target",
    "#pragma omp parallel for",
    "#pragma omp parallel loop",
    "#pragma omp parallel sections",
    // manually added
    "space holder 2",
    "#pragma omp parallel for simd",
    "#pragma omp parallel master",
    "#pragma omp master taskloop",
    "#pragma omp master taskloop simd",
    "#pragma omp parallel master taskloop",
    "#pragma omp parallel master taskloop simd",
    "#pragma omp teams distribute",
    "#pragma omp teams distribute simd",
    "#pragma omp teams distribute parallel for",
    "#pragma omp teams distribute parallel for simd",
    "#pragma omp teams loop",
    "#pragma omp target parallel",
    "#pragma omp target parallel for",
    "#pragma omp target parallel for simd",
    "#pragma omp target parallel loop",
    "#pragma omp target simd",
    "#pragma omp target teams",
    "#pragma omp target teams distribute",
    "#pragma omp target teams distribute simd",
    "#pragma omp target teams loop",
    "#pragma omp target teams distribute parallel for",
    "#pragma omp target teams distribute parallel for simd",
    "#pragma omp master",
    "#pragma omp critical",
    "#pragma omp barrier",
    "#pragma omp taskgroup",
    "#pragma omp atomic",
    "#pragma omp flush",
    "#pragma omp ordered",
    "#pragma omp depobj",
    "#pragma omp cancel",
    "#pragma omp cancellation point",
    "#pragma omp threadprivate",
    "#pragma omp declare reduction",
    "#pragma omp declare mapper",
]


const openMPDirectivesFortran = [
    //Fortran Directives
    //Variant Directives
    /!\$omp metadirective/gi,
    /!\$omp declare variant /gi,
    // requires directive
    /!\$omp requires/gi,
    // parallel construct
    /!\$omp parallel/gi,
    // teams construct
    /!\$omp teams/gi,
    // Worksharing constructs
    /!\$omp sections/gi,
    /!\$omp single /gi,
    /!\$omp workshare/gi,
    /!\$omp do/gi,
    // SIMD directives
    /!\$omp simd/gi,
    /!\$omp do simd/gi,
    /!\$omp declare simd/gi,
    // distribute loop constructs
    /!\$omp distribute/gi,
    /!\$omp distribute simd/gi,
    /!\$omp distribute parallel do/gi,
    /!\$omp distribute parallel do simd /gi,
    // loop construct
    /!\$omp loop/gi,
    // scan directive
    /!\$omp scan/gi,
    // Tasking constructs
    /!\$omp task/gi,
    /!\$omp taskloop/gi,
    /!\$omp taskloop simd/gi,
    /!\$omp taskyield/gi,
    // Memory management directive
    /!\$omp allocate /gi,
    // Device directives and construct
    /!\$omp target data/gi,
    /!\$omp target enter data/gi,
    /!\$omp target exit data/gi,
    /!\$omp target/gi,
    /!\$omp target update/gi,
    /!\$omp declare target/gi,
    // Combined constructs
    /!\$omp parallel do/gi,
    /!\$omp parallel loop/gi,
    /!\$omp parallel sections/gi,
    /!\$omp parallel workshare/gi,
    /!\$omp parallel do simd/gi,
    /!\$omp parallel master/gi,
    /!\$omp master taskloop/gi,
    /!\$omp master taskloop simd/gi,
    /!\$omp parallel master taskloop/gi,
    /!\$omp parallel master taskloop simd/gi,
    /!\$omp teams distribute/gi,
    /!\$omp teams distribute simd /gi,
    /!\$omp teams distribute parallel do/gi,
    /!\$omp teams distribute parallel do simd/gi,
    /!\$omp teams loop/gi,
    /!\$omp target parallel /gi,
    /!\$omp target parallel do/gi,
    /!\$omp target parallel for simd/gi,
    /!\$omp target parallel loop/gi,
    /!\$omp target simd/gi,
    /!\$omp target teams/gi,
    /!\$omp target teams distribute/gi,
    /!\$omp target teams distribute simd/gi,
    /!\$omp target teams loop/gi,
    /!\$omp target teams distribute parallel do/gi,
    /!\$omp target teams distribute parallel do simd/gi,
    // master construct
    /!\$omp master/gi,
    // Synchronization constructs
    /!\$omp critical/gi,
    /!\$omp barrier/gi,
    /!\$omp taskgroup/gi,
    /!\$omp atomic/gi,
    /!\$omp flush/gi,
    /!\$omp ordered/gi,
    /!\$omp depobj/gi,
    // Cancellation constructs
    /!\$omp cancel/gi,
    /!\$omp cancellation point/gi,
    // Data environment directive
    /!\$omp threadprivate/gi,
    /!\$omp declare reduction/gi,
    /!\$omp declare mapper/gi,
]

const openMPDirectivesC = [
    // C / C++ Directives
    // Variant Directives
    /#pragma omp metadirective/gi,
    /#pragma omp declare variant/gi,
    //requires directive
    /#pragma omp requires/gi,
    // parallel construct
    /#pragma omp parallel/gi,
    // teams construct
    /#pragma omp teams/gi,
    //Worksharing constructs
    /#pragma omp sections/gi,
    /#pragma omp single /gi,
    /#pragma omp for /gi,
    // SIMD directives
    /#pragma omp simd /gi,
    /#pragma omp for simd/gi,
    /#pragma omp declare simd/gi,
    // distribute loop constructs
    /#pragma omp distribute/gi,
    /#pragma omp distribute simd/gi,
    /#pragma omp distribute parallel for/gi,
    /#pragma omp distribute parallel for simd/gi,
    // loop construct
    /#pragma omp loop/gi,
    // scan directive
    /#pragma omp scan/gi,
    // Tasking constructs
    /#pragma omp task/gi,
    /#pragma omp taskloop/gi,
    /#pragma omp taskloop simd /gi,
    /#pragma omp taskyield/gi,
    // Memory management directive
    /#pragma omp allocate/gi,
    // Device directives and construct
    /#pragma omp target data/gi,
    /#pragma omp target enter data/gi,
    /#pragma omp target exit data/gi,
    /#pragma omp target/gi,
    /#pragma omp target update/gi,
    /#pragma omp declare target/gi,
    // Combined constructs
    /#pragma omp parallel for/gi,
    /#pragma omp parallel loop/gi,
    /#pragma omp parallel sections/gi,
    /#pragma omp parallel for simd/gi,
    /#pragma omp parallel master/gi,
    /#pragma omp master taskloop/gi,
    /#pragma omp master taskloop simd/gi,
    /#pragma omp parallel master taskloop/gi,
    /#pragma omp parallel master taskloop simd/gi,
    /#pragma omp teams distribute/gi,
    /#pragma omp teams distribute simd/gi,
    /#pragma omp teams distribute parallel for/gi,
    /#pragma omp teams distribute parallel for simd/gi,
    /#pragma omp teams loop/gi,
    /#pragma omp target parallel/gi,
    /#pragma omp target parallel for/gi,
    /#pragma omp target parallel for simd/gi,
    /#pragma omp target parallel loop/gi,
    /#pragma omp target simd/gi,
    /#pragma omp target teams/gi,
    /#pragma omp target teams distribute/gi,
    /#pragma omp target teams distribute simd/gi,
    /#pragma omp target teams loop/gi,
    /#pragma omp target teams distribute parallel for/gi,
    /#pragma omp target teams distribute parallel for simd/gi,
    // master construct
    /#pragma omp master/gi,
    // Synchronization constructs
    /#pragma omp critical/gi,
    /#pragma omp barrier/gi,
    /#pragma omp taskgroup/gi,
    /#pragma omp atomic/gi,
    /#pragma omp flush/gi,
    /#pragma omp ordered/gi,
    /#pragma omp depobj/gi,
    // Cancellation constructs
    /#pragma omp cancel/gi,
    /#pragma omp cancellation point/gi,
    // Data environment directive
    /#pragma omp threadprivate/gi,
    /#pragma omp declare reduction/gi,
    /#pragma omp declare mapper/gi,
]

module.exports = {
    openMPDirectivesFortran,
    openMPDirectivesC,
    openMPDirectivesAll,
    openMPDirectivesFortranString,
    openMPDirectivesCString
};
